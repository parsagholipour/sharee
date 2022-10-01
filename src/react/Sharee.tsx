import {useEffect, useRef} from "react";
import ShareeClass from '../lib/Sharee'
import ShareeOptions from "../common/ShareeOptions";

export default function Sharee(props: ShareeOptions) {
  const shareeEl = useRef<HTMLDivElement|null>(null)
  const sharee = useRef<ShareeClass|null>(null)

  useEffect(() => {
    return () => {
      if (sharee.current) {
        sharee.current.destroy();
      }
      sharee.current = new ShareeClass(shareeEl.current!, props)
    };
  }, [props]);


  return <div ref={shareeEl} />
}
