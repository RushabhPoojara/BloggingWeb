import { Link } from "react-router-dom"

interface BlogCardProps  {
    authorName : string,
    title: string,
    content : string,
    publishedDate : string
    id: Number
}

export const BlogCard = ({
        authorName, 
        title, 
        content,
        publishedDate,
        id
    } : BlogCardProps) => {
            return <Link to={`/blog/${id}`}>
                <div className="p-4 w-screen max-w-screen-md cursor-pointer ">
                <div className="flex ">
                    <div >
                        <Avatar name={authorName} />
                    </div>
                    <div className="flex justify-center flex-col mx-2 font-extralight">
                        {authorName} 
                    </div>
                    <div className="flex justify-center flex-col mr-2">
                        <Circle />
                    </div>
                    <div className="font-thin text-slate-400 flex justify-center flex-col">
                        {publishedDate}
                    </div> 
                </div>
                <div className="font-bold text-xl w-full mt-1" >
                    {title}
                </div>
                <div className="mt-3 font-thin">
                    {content.substring(0,150) + "..."}
                </div>
                <div className="font-thin text-slate-400 text-sm mt-5">
                    {`${Math.ceil(content.length/100)} min read`}
                </div>
                <div className="mt-3 bg-slate-100 h-1 w-full">

                </div>


            </div>
        </Link>
} 


export function Circle() {
return <div className="h-1 w-1 rounded-full bg-slate-400">

</div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}