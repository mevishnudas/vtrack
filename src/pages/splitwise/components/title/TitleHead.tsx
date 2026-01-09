type TitleHeadProps = {
    title:string
}
const TitleHead = ({title}:TitleHeadProps) =>{
    return(
        <div className="grid grid-cols-3 border-b-1 border-b-gray-600 pb-2">
            <div className="col-span-1 flex items-center">
                <h1 className="text-white text-xl">{title}</h1>
            </div>
            <div className="col-span-2 gap-3 flex justify-end"> 
                {/* bg-gradient-to-b from-orange-600 to-orange-700 */}
                <button className="bg-orange-600 hover:bg-orange-700 p-2 rounded-sm  text-sm text-shadow-sm cursor-pointer">Add an expense</button>
                <button className="bg-green-600 hover:bg-green-700 p-2 rounded-sm  text-sm text-shadow-sm cursor-pointer">Settle up</button>
            </div>
        </div>
    );
};

export default TitleHead;