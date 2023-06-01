const FormTest = () => {
  return (
    <div>
      <form
        method="post"
        className="m-auto flex h-72 max-w-lg flex-col justify-between p-1"
      >
        <label htmlFor="Name">Name *</label>
        <input
          id="Name"
          name="Name"
          type="text"
          autoComplete="Name"
          className="max-w-lg rounded-sm p-1 outline outline-1 outline-neutral-300 valid:bg-green-100 invalid:bg-redwood-100"
          required
        />
        <label htmlFor="Email">Email *</label>
        <input
          id="Email"
          name="Email"
          type="Email"
          autoComplete="Email"
          className="max-w-lg rounded-sm p-1 outline outline-1 outline-neutral-300 valid:bg-green-100 invalid:bg-redwood-100"
          required
        />
        <label htmlFor="CSSTeam">Which team will you be joining?:</label>
        <select
          id="CSSTeam"
          name="CSSTeam"
          className="rounded-sm bg-blue-200 p-2 outline outline-1 outline-blue-300"
        >
          <option value="Software Engineering">Software Engineering</option>
          <option value="Animation">Animation</option>
          <option value="Communication">Communication</option>
          <option value="Video Production">Video Production</option>
          <option value="Storyboarding">Storyboarding</option>
          <option value="Graphic Design">Graphic Design</option>
        </select>
        <button type="submit" className="mt-6 rounded-sm bg-blue-400 p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormTest;
