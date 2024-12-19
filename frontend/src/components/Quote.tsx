import myImage from "../assets/images/bg.jpg";

export const Quote = () => {
  return (
    <div className='bg-slate-200 h-screen flex justify-center flex-col'>
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div>
                <img src={myImage} alt="Description of image" />
                </div>
                <div className="text-center text-3xl font-bold pt-6">
                "Do what you can, with what you have, where you are."
                </div>

                <div className="max-w-md text-xl font-bold text-left mt-4">
                    Theodore Roosevelt
                </div>
                {/* <div className="max-w-md text-sm font-medium text-slate-400">
                    CEO | Acme
                </div> */}
            </div>
        </div>
        
    </div>
  )
}
