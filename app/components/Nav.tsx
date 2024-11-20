///////////////////////////////////////////////
///~ (bc) navigation bar at the top
import React from 'react';
import { Link, Form } from "@remix-run/react";
import {
  User,
  Settings,
  LogOut,
  Code2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

///////////////////////////////////////////////
///~ avatar generator for accounts
const getAvatarUrl = (name: string = "User") => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=990000&color=fff&bold=true`;
};

{/* nav start - javascript function shorthand  */}
const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-red-900 text-white z-50 shadow-md">

      {/* the hero title */}
      <div className="max-w-4xl mx-auto flex items-center justify-center h-full relative">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold absolute left-1/2 transform -translate-x-1/2 transition-all duration-200 hover:scale-105"
        >
          <Code2 className="h-5 w-5 text-yellow-500 transition-colors duration-200 hover:text-yellow-400" />
          <span className="font-bold tracking-tight hover:text-yellow-50">CSCI201 Project</span>
        </Link>
        <div className="ml-auto">

          {/*  profile account icon/button right side */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>

              {/* the button also acts as the icon */}
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full hover:bg-red-800/50 transition-colors duration-200"
              >
                <Avatar className="h-8 w-8 ring-2 ring-red-800 transition-all duration-200 hover:ring-yellow-500">
                  <AvatarImage src="/public/profile.jpg" alt="User" />
                  <AvatarFallback className="bg-red-800 text-white text-sm">
                    BW
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            {/* when clicked, show these menu items */}
            <DropdownMenuContent className="w-56 mt-1" align="end">
              <div className="flex items-center gap-2 p-2 border-b">

                {/* the profile snippet as top level menu item */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAvatarUrl("John Doe")} alt="User" />
                  <AvatarFallback>Af</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Aasdfa asdfasdf </p>
                  <p className="text-xs text-muted-foreground">asdfasdff@asfd.com</p>
                </div>
              </div>

              {/* view profile menu item */}
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>

              {/* log out menu items */}
              <DropdownMenuItem asChild>
                <Form action="/logout" method="post" className="w-full">
                  <button
                    type="submit"
                    className="flex items-center w-full cursor-pointer text-red-600 px-2 py-1.5 text-sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </button>
                </Form>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;