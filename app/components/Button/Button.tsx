import { Button, ButtonProps } from "@mantine/core"
import React, { ReactNode } from "react"

interface ButtonComponentprops extends ButtonProps {
  children: ReactNode,
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonComponent: React.FC<ButtonComponentprops> = ({children, type, ...props}) => {
  return (
    <Button
      type={type}
      variant="gradient"
      gradient={{ from: 'pink', to: 'yellow' }}
      {...props}
    >
      {children}
    </Button>
  )
}