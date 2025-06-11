"use client"
import { useActionState } from "react";
import Inputs from "./inputs";

const delay = (ms: number) => new Promise((resolve) => {
    setTimeout(() => resolve('done'), ms)
})

export default function Actions() {
    const [, submitAction] = useActionState<string[], FormData>(async (previousState, formData) => {
        console.log('p', previousState, formData)
        await delay(5000);

        console.log('here')

        if (formData.getAll('input').filter(Boolean).length === 3) {
            return formData.getAll('input') as string[]
        }



        return ['Missing', 'data']
    }, [])


    return (
        <form action={submitAction} className="grid grid-cols-1 gap-y-2 max-w-2xl">
            <Inputs />
        </form>
    )
}