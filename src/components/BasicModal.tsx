import ReactDOM from "react-dom";

const BasicModal = ({children }: any) => {
    return ReactDOM.createPortal((
        <div className="flex h-screen justify-center items-center absolute top-0 left-0 right-0">
            <div className="max-w-sm p-6 m-auto bg-green-300 rounded-md">
                {children}
            </div>
        </div>
    ), document.body);
};

export default BasicModal;