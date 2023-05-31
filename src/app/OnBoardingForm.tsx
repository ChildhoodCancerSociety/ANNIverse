export default function FormTest() {
    return (
        <div>
            <form method="post" className="flex flex-col max-w-lg h-72 justify-between m-auto p-1">
                <label htmlFor="Name">Name *</label>
                <input id="Name" name="Name" type="text" autoComplete="Name" className="outline outline-1 outline-neutral-300 valid:bg-green-100 max-w-lg p-1 invalid:bg-redwood-100 rounded-sm" required />
                <label htmlFor="Email">Email *</label>
                <input id="Email" name="Email" type="Email" autoComplete="Email" className="outline outline-1 outline-neutral-300 valid:bg-green-100 max-w-lg p-1 invalid:bg-redwood-100 rounded-sm" required />
                <label htmlFor="CSSTeam">Which team will you be joining?:</label>
                <select id="CSSTeam" name="CSSTeam" className="p-2 outline outline-1 outline-blue-300 rounded-sm bg-blue-200">
                    <option value={'Software Engineering'}>Software Engineering</option>
                    <option value={'Animation'}>Animation</option>
                    <option value={'Communication'}>Communication</option>
                    <option value={'Video Production'}>Video Production</option>
                    <option value={'Storyboarding'}>Storyboarding</option>
                    <option value={'Graphic Design'}>Graphic Design</option>
                </select>
                <button type="submit" className="bg-blue-400 rounded-sm p-2 mt-6">Submit</button>
            </form>
        </div>
    )
}

