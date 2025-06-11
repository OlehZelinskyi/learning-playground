import { useFormStatus } from "react-dom"

const Form = () => {
    const { pending, data, action, method } = useFormStatus()

    console.log('useFormStatus', { pending, data, action, method })

    return (
        <>
            <input className="bg-white text-black" name="input" placeholder="first name" />
            <input className="bg-white text-black" name="input" placeholder="last name" />
            <input className="bg-white text-black" name="input" placeholder="age" />

            <button disabled={pending} type="submit" className="bg-blue-500">
                {pending ? 'loading...' : 'submit'}
            </button>

            <p>Pending Data</p>
            {!!data?.getAll('input').length && (
                <pre>
                    {JSON.stringify(data.getAll('input'), null, 4)}
                </pre>
            )}

        </>
    )
}

export default Form