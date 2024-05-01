import Image from "next/image";
import Page from "./pages/feedback/page";
import Navbar from '@/app/components/navbar/page'


export default function Home() {
  return (
    <>
    <Navbar></Navbar>
    
    <Page></Page>
    </>
   
  );
}
