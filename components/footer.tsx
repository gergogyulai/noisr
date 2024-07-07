import React from 'react'
import { FileText, Github, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/gergogyulai/noiser"
        target="_blank"
      >
        <Github size={16} />
        Github
      </a>
      {/* <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/how-to-use"
      >
        <FileText size={16} />
        How to use?
      </a> */}
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://gergo.cc"
        target="_blank"
      >
        <Globe size={16} />
        gergo.cc
      </a>
    </footer>
  )
}

export default Footer