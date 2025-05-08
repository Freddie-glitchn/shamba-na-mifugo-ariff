
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cube, Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ARViewerProps {
  modelSrc: string;
  plantName: string;
}

const ARViewer = ({ modelSrc, plantName }: ARViewerProps) => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if WebXR is supported
    if ('xr' in navigator) {
      // @ts-ignore - TypeScript doesn't know about isSessionSupported
      navigator.xr?.isSessionSupported('immersive-ar')
        .then((supported) => {
          setIsARSupported(supported);
        })
        .catch(() => {
          setIsARSupported(false);
        });
    } else {
      setIsARSupported(false);
    }
  }, []);

  const launchAR = () => {
    setIsLoading(true);
    
    // Simulate AR loading
    setTimeout(() => {
      setIsLoading(false);
      
      if (isARSupported) {
        toast({
          title: "Starting AR Experience",
          description: `Launching AR viewer for ${plantName}`,
        });
      } else {
        toast({
          title: "AR Not Supported",
          description: "Your device does not support WebXR AR experiences. Please try on a compatible device.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={launchAR}
        disabled={isLoading}
        className="flex items-center gap-2"
        variant={isARSupported ? "default" : "secondary"}
      >
        {isLoading ? (
          <>Loading AR...</>
        ) : (
          <>
            {isARSupported ? <Camera className="h-4 w-4" /> : <Cube className="h-4 w-4" />}
            {isARSupported ? "View in AR" : "View 3D Model"}
          </>
        )}
      </Button>
      
      {!isARSupported && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AR not supported on this device
        </p>
      )}
    </div>
  );
};

export default ARViewer;
