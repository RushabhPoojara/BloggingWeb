import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";


export const Blogs = () => {

    const {loading, blogs} = useBlogs();

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    if (!blogs || blogs.length === 0) {
        return <p>No blogs available</p>;
    }
    console.log(blogs)

    return <div>
        <Appbar />
        <div  className="flex justify-center">
            <div>
                {blogs && blogs.map(blogs => <BlogCard
                    id={blogs.id}
                    authorName={blogs.author.name || "Anonymous"}
                    title={blogs.title}
                    content={blogs.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
                   {/* <BlogCard 
                authorName={"Rushabh Poojara"}
                title = {"How an ugly single page website maskes $50000 a month without affiliate marketing"}
                content = {"Hi this is my first post, I'll make a post every day as a part of my journal and post it here. so please take a look everyday and have a read and click like and subsribe to my posts"}
                publishedDate = {"1st of Feb"} 
                id  = {1}
                /> */}
            </div>
        </div>
    </div>
}