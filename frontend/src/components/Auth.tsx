import { ChangeEvent, useState } from "react"
import { Link , useNavigate} from "react-router-dom"
import { SignupValidation } from "rushabh-commom-1"
import axios from "axios"
import {BACKEND_URL} from '../config'


export const Auth = ({type} : {type : "signup" | "signin"}) => {

    const [postData, setPostdata] = useState<SignupValidation>({
        name : "",
        username : "",
        password : " "
    })

    const navigate = useNavigate()

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type === 'signin' ? 'signin' : "signup"}`, postData)
            const token = response.data
            localStorage.setItem("token", token)
            navigate("/blogs")
        }
        catch(e) {
            alert("Internal server down")
        }

    }

    return <div className="flex justify-center items-center h-screen">
     <div className="w-2/5 ">
        <div className="font-extrabold text-2xl flex justify-center items-center">
            Create an account
        </div>
        <div className="flex justify-evenly mt-1 max-w-lg">
            <div className="text-slate-400 text-bold ">
                {type === 'signin' ? "Don't have account?" : "Already have a account?"}
                <Link to={type === 'signin' ? '/signup' : '/signin'} className="pl-2 underline">{type === 'signin' ? 'Sign up' : "Login"}  </Link>
            </div>
        </div >
        <div className="mt-4 flex flex-col justify-between gap-4">
            {type === 'signup' ? 
            <LabelledInput label="Name" placeholder="Enter your name" Onchange={(e : any) => {
                setPostdata({
                    ...postData , 
                    name : e.target.value
                })
            }} /> : null}
            <LabelledInput label="Username" placeholder="Enter your username" Onchange={(e : any) => {
                setPostdata({
                    ...postData , 
                    username : e.target.value
                })
            }} />
            <LabelledInput label="password" type={'Password'} placeholder="***********" Onchange={(e : any) => {
                setPostdata({
                    ...postData , 
                    password : e.target.value
                })
            }} />
            <div className="pt-4">
                <button type="button" onClick={sendRequest} className="text-white text-2xl w-[100%] bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 
                font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700
                dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in" }</button>
            </div>
        </div>
        
    </div>
</div>
}


type LabelledInputType = {
    label : string, 
    placeholder : string,
    Onchange : (e: ChangeEvent<HTMLInputElement>) => void
    type? : string
}


function LabelledInput({label, placeholder, Onchange ,type} : LabelledInputType)  {
        return <div>
        <label className ="block mb-2 text-sm font-semibold text-gray-900 dark:text-black">{label}</label>
        <input onChange={Onchange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
        rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5" 
         placeholder={placeholder} required />
    </div>
}