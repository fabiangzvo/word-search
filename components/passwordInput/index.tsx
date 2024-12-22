"use client";

import { useState, useCallback, useMemo, JSX } from "react";
import { Input, Tooltip } from "@nextui-org/react";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

function PasswordInput(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = useCallback(
    () => setIsVisible(!isVisible),
    [isVisible]
  );

  const { icon, type, tooltip } = useMemo(() => {
    if (isVisible)
      return {
        tooltip: "Ocultar contraseña",
        type: "text",
        icon: (
          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
        ),
      };

    return {
      tooltip: "Ver contraseña",
      type: "password",
      icon: (
        <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
      ),
    };
  }, [isVisible]);

  return (
    <Input
      label="Contraseña"
      name="password"
      variant="bordered"
      placeholder="tu contraseña"
      endContent={
        <Tooltip content={tooltip}>
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {icon}
          </button>
        </Tooltip>
      }
      type={type}
    />
  );
}

export default PasswordInput;
