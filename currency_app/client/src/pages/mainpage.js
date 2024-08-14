import React, {useEffect, useState} from 'react';
import axios from "axios";
export default function MainPage() {

    //state for the form feilds
    const [date,setdate] = useState(null);
    const [Sourcecurrency,setsourcecurrency] = useState("");
    const [Targetcurrency,setTargetcurrency] = useState("");
    const [AmountinSourcecurrency,setAmountinSourcecurrency] = useState(0);
    const [AmountinTargetcurrency,setAmountintargetcurrency] = useState(0);
    const [currencynames , setcurrencynames] = useState([]);
    const[loading,setloading] = useState(true);
    //handlesubmit method
    const handlesubmit = async (e) => {
        e.preventDefault();
        try{  
         
          const response = await axios.get("http://localhost:5000/convert" , { 
            params:{
            date, 
            Sourcecurrency,
            Targetcurrency,
            AmountinSourcecurrency, 
         },
         } );

       setAmountintargetcurrency(response.data);
       setloading(false);

       console.log(AmountinSourcecurrency , AmountinTargetcurrency);
        }catch(err){
          console.error(err);
        }
       
    };

    //get all currency names
    useEffect(()=>{

      const getcurrencynames = async() => {
        try{

          const response = await axios.get("http://localhost:5000/getallcurrencies");
          setcurrencynames(response.data);

        }catch(err){
          console.error(err);
        }
      };
      getcurrencynames();
    } , [])

  return (
    <div>
      <h1 className=' lg:mx-32 text-5xl font-bold text-green-500'>Convert Your Currencies Today</h1>
      <p className=' lg:mx-32 opacity-40 py-6'>Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates. Whether
        you're planning a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.  </p>
<div className=' mt-5 flex items-center justify-center flex-col '>
    <section className=' w-full lg:w-1/2'>
        <form onSubmit={handlesubmit}  >
            
            <div class="mb-4">
    <label htmlFor="date" className="Date" class="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Date</label>
    <input 
    onChange={(e) => setdate(e.target.value)} 
    type="Date" id={date} name={date}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="date" required />

            </div>
            <div class="mb-4">
    <label htmlFor="Sourse Currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Select Sourse Currency</label>
    <select 
    onChange={(e) => setsourcecurrency(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name='Sourse Currency'id='Sourse Currency'>
    <option value="">Select The Sourse Currency</option>
    {Object.keys(currencynames).map((currency)=>(
<option className=' p-1 ' key={currency} value={currency}>{
  currencynames[currency]
  } </option>
    ))}
 
    </select>
     </div>
            <div class="mb-4">
    <label htmlFor="Target Currency" class="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Target Currency</label>
    <select 
    onChange={(e) => setTargetcurrency(e.target.value)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name='Target Currency'id='Target Currency'>
    <option value="Target Currency">Select The Target Currency</option>
    {Object.keys(currencynames).map((currency)=>(
<option className=' p-1 ' key={currency} value={currency}>{
  currencynames[currency]
  } </option> 
    ))}
    
    </select>
    </div>
    <div class="mb-4">
    <label for="Amount in Source Currency" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in Source Currency</label>
    <input 
    onChange={(e) => setAmountinSourcecurrency(e.target.value)}
    type="number" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Amount in Source Currency" required />

            </div>
            <button  className=' bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md '>
                Get the Target Currency
            </button>
        </form>
    </section>
</div>

{!loading ? <section className=' lg:mx-60 text-xl  mt-5'>
{AmountinSourcecurrency} {currencynames[Sourcecurrency]} is equals to {""}
<span className='text-green-500 font-bold' >
  {""}
  {AmountinTargetcurrency}</span> in {currencynames[Targetcurrency]}
</section> : null }
 
    </div>
  );
}
