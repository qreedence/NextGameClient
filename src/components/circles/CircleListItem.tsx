import { CircleDTO } from "@/apiclient/models/CircleDTO";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

interface CircleListItemProps {
  circleDTO: CircleDTO;
}

const CircleListItem = ({ circleDTO }: CircleListItemProps) => {
  return (
    <Link to={`/c/${circleDTO?.id}`}>
      <Card className="w-max p-2 shadow-md bg-primary hover:cursor-pointer">
        <CardHeader>
          <p className="font-bold tracking-wider text-lg">{circleDTO.name}</p>
        </CardHeader>
        <CardContent>
          <div className="flex -space-x-2 items-center justify-center">
            {circleDTO.activeMembers &&
              circleDTO.activeMembers.map((userDTO) => (
                <Avatar
                  key={userDTO.username}
                  className="border-2 border-white"
                >
                  {userDTO?.avatar !== null && (
                    <>
                      <AvatarImage
                        src={userDTO?.avatar}
                        alt={userDTO?.username}
                      />
                      <AvatarFallback>
                        {userDTO?.username.charAt(0)}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CircleListItem;
