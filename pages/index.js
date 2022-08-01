import { useState } from "react";
import Header from "./components/Header/navbar"

export default function Index() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={toggle}/>
      <h1>dashboard index</h1>
    </>
  )
}
