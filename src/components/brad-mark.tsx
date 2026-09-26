import React from "react"

export function BradMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 576 320"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M0 0h192v64H0z M0 64h64v64H0z M128 64h64v64h-64z M0 128h192v64H0z M0 192h64v64H0z M128 192h64v64h-64z M0 256h192v64H0z M256 0h64v320h-64z M320 64h64v64h-64z M384 128h64v64h-64z M448 64h64v64h-64z M512 0h64v320h-64z"
      />
    </svg>
  )
}
