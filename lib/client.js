import sanityClient from "@sanity/client";
import ImageUrlBuilder  from "@sanity/image-url";

export const client= sanityClient({
    projectId:'g09eft5i',
    dataset:'production',
    apiVersion:'2023-06-10',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
})


const builder=ImageUrlBuilder(client)
export const urlFor=(source)=>{
    return(
        builder.image(source)
    )
}