import { Expand, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useResizeDetector } from 'react-resize-detector';
import SimpleBar from 'simplebar-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useToast } from './ui/use-toast';

const PdfFullscreen = (props: { fileUrl: string }) => {
  const { fileUrl } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();

  const pdfRef = useRef(null);
  const { width } = useResizeDetector({
    targetRef: pdfRef,
  });
  const { toast } = useToast();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(open)}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button aria-label='fullscreen' variant='ghost' className='gap-1.5'>
          <Expand className='h-4 w-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-7xl w-full'>
        <SimpleBar autoHide={false} className='max-h-[calc(100vh-10rem)] mt-6'>
          <div ref={pdfRef}>
            <Document
              loading={
                <div className='flex justify-center'>
                  <Loader2 className='my-24 h-6 w-6 animate-spin' />
                </div>
              }
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() => {
                toast({
                  title: 'Error loading PDF',
                  description: 'Please try again later',
                  variant: 'destructive',
                });
              }}
              file={fileUrl}
              className='max-h-full'
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
