export default function Figure({src, alt}: {src: string, alt: string, caption: string}) {
   return (
       <div  className={"text-center"}>
         <img decoding={"async"} loading={"lazy"} src={src} alt={alt} className={"lg:max-w-lg lg:min-w-lg md:max-w-md sm:max-w-sm inline-block"} />
      </div>
   );
}

