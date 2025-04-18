import { CircleDTO } from "@/apiclient/models/CircleDTO";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

interface CircleListItemProps {
  circleDTO: CircleDTO;
}

const CircleListItem = ({ circleDTO }: CircleListItemProps) => {
  return (
    <Card className="w-max p-2 shadow-md bg-primary hover:cursor-pointer">
      <Link to={`/c/${circleDTO?.id}`}>
        <CardHeader>
          <p className="font-bold tracking-wider text-lg">{circleDTO.name}</p>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-2 items-center justify-center">
            {circleDTO.activeMembers &&
              circleDTO.activeMembers.map((circleMember) => (
                <Avatar
                  key={circleMember.user.username}
                  className="border-2 border-white"
                >
                  {circleMember.user?.avatar !== null && (
                    <>
                      <AvatarImage
                        src={circleMember.user?.avatar}
                        alt={circleMember.user?.username}
                      />
                      <AvatarFallback>
                        {circleMember.user?.username.charAt(0)}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CircleListItem;
