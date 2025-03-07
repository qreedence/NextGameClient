import CircleListItem from "@/components/circles/CircleListItem";
import CreateCircle from "@/components/circles/CreateCircle";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetCirclesForUser from "@/hooks/circles/useGetCirclesForUser";
import { CircleDashed, PlusIcon, Mail } from "lucide-react";
import { PulseLoader } from "react-spinners";

const Circles = () => {
  const { circles, isPending } = useGetCirclesForUser();

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <PulseLoader color="white" size={5} />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <Tabs
          orientation="vertical"
          defaultValue="circles"
          className="flex space-x-8"
        >
          <TabsList className="flex flex-col h-[400px] justify-start items-stretch p-2 rounded-lg bg-accent">
            <TabsTrigger
              className="justify-start px-4 py-2 text-left flex gap-2 text-foreground"
              value={"circles"}
            >
              <CircleDashed className="w-5" />
              Circles
            </TabsTrigger>
            <TabsTrigger
              className="justify-start px-4 py-2 text-left flex gap-2 text-foreground"
              value={"createCircle"}
            >
              <PlusIcon className="w-5" />
              Create Circle
            </TabsTrigger>
            <TabsTrigger
              className="justify-start px-4 py-2 text-left flex gap-2 text-foreground"
              value={"circleInvitations"}
            >
              <Mail className="w-5" />
              Circle Invitations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="circles" className="mt-0">
            <ul className="flex flex-col gap-2 sm:flex-row">
              {circles &&
                circles.map((circle) => (
                  <CircleListItem key={circle.id} circleDTO={circle} />
                ))}
            </ul>
          </TabsContent>
          <TabsContent value="createCircle" className="mt-0">
            <Card className="w-full p-4">
              <CardContent className="py-2">
                <CreateCircle />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="circleInvitations" className="mt-0">
            <Card className="w-full">
              <CardContent className="py-2">
                <p>Not implemented yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Circles;
