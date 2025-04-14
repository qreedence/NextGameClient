import type React from "react";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ScreenshotCarouselProps {
  screenshotUrls: Array<string>;
}

const ScreenshotCarousel = ({ screenshotUrls }: ScreenshotCarouselProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openFullScreen = (index: number) => {
    setActiveIndex(index);
    setIsFullScreen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
    document.body.style.overflow = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeFullScreen();
    } else if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % screenshotUrls.length);
    } else if (e.key === "ArrowLeft") {
      setActiveIndex(
        (prev) => (prev - 1 + screenshotUrls.length) % screenshotUrls.length
      );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {screenshotUrls.map((screenshot, index) => (
            <CarouselItem
              key={screenshot}
              className="md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card
                className="border-none overflow-hidden transition-transform hover:scale-105"
                onClick={() => openFullScreen(index)}
              >
                <CardContent className="p-2">
                  <div className="aspect-video cursor-pointer">
                    <img
                      className="border-1 border-foreground rounded-md cover"
                      src={screenshot || "/placeholder.svg"}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {isFullScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeFullScreen}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={closeFullScreen}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>

          <Carousel
            className="max-w-7/10"
            opts={{
              align: "start",
              loop: true,
              startIndex: activeIndex,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselContent>
              {screenshotUrls.map((screenshot) => (
                <CarouselItem key={screenshot}>
                  <div className="relative aspect-video w-full">
                    <img
                      src={screenshot || "/placeholder.svg"}
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ScreenshotCarousel;
