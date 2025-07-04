'use client'

import { Spinner } from "@heroui/spinner";
import { JSX } from "react";

export default function LoadingPage():JSX.Element {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Spinner size="lg"/>
        </div>
    )
}