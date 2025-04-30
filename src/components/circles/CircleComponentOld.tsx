// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { Separator } from "../ui/separator";
// import { Gamepad2, ListPlus, RotateCw, Users } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import CircleOptionsDropdown from "./CircleOptionsDropdown";
// import CircleInviteDialog from "./CircleInviteDialog";
// import { CircleDTO } from "@/apiclient";
// import CircleSuggestions from "./CircleSuggestions";
// import { FaArchive, FaCrown, FaShieldAlt } from "react-icons/fa";
// import { toast } from "sonner";
// import { GameList } from "./gamelist/SortableGameList";
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../ui/breadcrumb";

// interface CircleComponent {
//   circleDTO: CircleDTO;
// }

// const CircleComponent = ({ circleDTO }: CircleComponent) => {
//   const sortedMembers = circleDTO.activeMembers
//     ?.slice()
//     .sort((a, b) => a.role - b.role);

//   return (
//     <>
//   <div className="flex justify-between">
//     <p className="font-black text-3xl tracking-normal">{circleDTO.name}</p>
//     <div className="flex items-center gap-2">
//       <CircleInviteDialog circleId={circleDTO.id} />
//       <CircleOptionsDropdown circleId={circleDTO.id} />
//     </div>
//   </div>
//   <Separator className="my-4" />
//       <div className="container grid gap-6 py-6 xl:grid-cols-[1fr_350px]">
//         <div className="space-y-6">
//           <Tabs defaultValue="current" className="w-full">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="current" className="flex items-center gap-2">
//                 <Gamepad2 className="size-5" />
//                 <span>Currently Playing</span>
//               </TabsTrigger>
//               <TabsTrigger value="rotation" className="flex items-center gap-2">
//                 <RotateCw className="size-5" />
//                 <span>In Rotation</span>
//               </TabsTrigger>
//               <TabsTrigger value="backlog" className="flex items-center gap-2">
//                 <FaArchive />
//                 <span>Backlog</span>
//               </TabsTrigger>
//               <TabsTrigger
//                 value="suggestions"
//                 className="flex items-center gap-2"
//               >
//                 <ListPlus className="size-5" />
//                 <span>Suggestions</span>
//               </TabsTrigger>
//             </TabsList>
//             <TabsContent value="current" className="w-full">
//               {circleDTO.circleGames && (
// <GameList
//   circleId={circleDTO.id}
//   games={circleDTO.circleGames.filter(
//     (g) => g.gameStatus === 1
//   )}
// />
//               )}
//             </TabsContent>
//             <TabsContent value="rotation">
//               {circleDTO.circleGames && (
// <GameList
//   circleId={circleDTO.id}
//   games={circleDTO.circleGames.filter(
//     (g) => g.gameStatus === 2
//   )}
// />
//               )}
//             </TabsContent>
//             <TabsContent value="backlog">
//               {circleDTO.circleGames && (
//                 <GameList
//                   circleId={circleDTO.id}
//                   games={circleDTO.circleGames.filter(
//                     (g) => g.gameStatus === 3
//                   )}
//                 />
//               )}
//             </TabsContent>
//             <TabsContent value="suggestions" className="w-full">
//               <CircleSuggestions circleId={circleDTO.id} />
//             </TabsContent>
//           </Tabs>
//         </div>
// <div className="space-y-6">
//   <Card>
//     <CardHeader>
//       <CardTitle className="flex items-center gap-2">
//         <Users className="h-5 w-5" />
//         Circle Members
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       <div className="space-y-4">
//         {sortedMembers?.map((circleMember) => (
//           <div
//             key={`${circleMember.user.userId}-${circleDTO.id}`}
//             className="flex items-center gap-4"
//           >
//             <div className="relative">
//               {circleMember.user.avatar !== null && (
//                 <Avatar className="border-2 border-white">
//                   <AvatarImage
//                     src={circleMember.user.avatar}
//                     alt={circleMember.user.username}
//                   />
//                   <AvatarFallback>
//                     {circleMember.user.username.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//               )}
//             </div>
//             <div className="flex-1 overflow-hidden">
//               <p className="truncate font-medium flex items-center gap-2">
//                 {circleMember.user.username}
//                 {circleMember.role === 0 && <FaCrown />}
//                 {circleMember.role === 1 && <FaShieldAlt />}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </CardContent>
//     <CardFooter>
//       <Button
//         variant="outline"
//         className="w-full"
//         onClick={() => {
//           toast("Not implemented yet!");
//         }}
//       >
//         Manage Circle
//       </Button>
//     </CardFooter>
//   </Card>
// </div>
//       </div>
//     </>
//   );
// };

// export default CircleComponent;
