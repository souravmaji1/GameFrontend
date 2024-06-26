import React from "react";

export default function Confirm({ searchParams }) {
  return (
    <div>
      <div className="w-full px-8 sm:max-w-lg mx-auto mt-8">
        <p className="text-foreground">{searchParams.message}</p>
      </div>
    </div>
  );
}