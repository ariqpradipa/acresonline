import { useEffect, useState } from "react";
import Header from "./components/Header/navbar"
import Cookies from "js-cookie";

export default function Index() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {

    if (Cookies.get("tokenAcres") !== undefined || Cookies.get("usernameAcres") !== undefined) {

      window.location.href = "/main"
      
    }

  }, [])

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={toggle} />
      <h1>dashboard index</h1>
    </>
  )
}
