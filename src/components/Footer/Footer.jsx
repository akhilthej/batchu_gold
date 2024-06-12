import React from 'react';
import {Link} from 'react-router-dom';

 
import footer_gold from './TGJLogofooter.png';
import footer_csd from './csdv2Logofooter.svg';


const Footer = () => {
  
  const currentYear = new Date().getFullYear();
  return (
    
    <main className='bg-black'>
    {/* Footer */}
    <section className='bg-black pb-10'>
    <footer >
  <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-9 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <div>
    <Link to ='/'>
    <img
  src={footer_gold} alt="csdlogo" width={250} height={50} className="cursor-pointer" />

</Link>
        <p className="max-w-xs mt-4 text-sm text-gray-600">
        Est. Since 1980, Located in Hyderabad. Buy Gold from 10 rupees.<br />
        </p>
       
        

        <div className="flex space-x-6 text-gray-600 pt-2">
          <a
            href="https://www.facebook.com/profile.php?id=100087441512479"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> Facebook </span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillrule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                cliprule="evenodd"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/cyber.space.digital/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only"> Instagram </span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                fillrule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                cliprule="evenodd"
              />
            </svg>
          </a>
          
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-medium text-white">Company</p>
          <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
            <a href="/aboutus">
              {" "}
              About us{" "}
            </a>
            <a href="/clients">
              {" "}
              Clients{" "}
            </a>
          </nav>
        </div>
        <div>
          <p className="font-medium text-white">Services</p>
          <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
            
            <a href="https://search.google.com/local/writereview?placeid=ChIJM0IEPqRRmg0RyLQAP_5varc">
              {" "}
              Google Map Review{" "}
            </a>
            <a  href="/reviews">
              {" "}
              Client Review{" "}
            </a>
            
          </nav>
        </div>
        <div>
          <p className="font-medium text-white">Helpful Links</p>
          <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
            <a  href="/contactus">
              {" "}
              Contact{" "}
            </a>
            <a  href="/contactus">
              {" "}
              FAQs{" "}
            </a>
            <a  href="https://api.whatsapp.com/send?phone=918143407758&text=Welcome%20to%20Cyberspacedigital">
              {" "}
              Live Chat{" "}
            </a>
          </nav>
        </div>
        <div>
          <p className="font-medium text-white">Legal</p>
          <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
            <Link to='/privacypolicy'>
              {" "}
              Privacy Policy{" "}
            </Link>
            <Link to='/termsconditions'>
              {" "}
              Terms &amp; Conditions{" "}
            </Link>
            
            <Link to='/returnpolicy'>
              {" "}
              Cancellation & Refund Policy{" "}
            </Link>

            <Link to='/disclaimer'>
              {" "}
              Disclaimer{" "}
            </Link>

            <Link to='/shippingdelivery'>
              {" "}
              Shipping & Delivery{" "}
            </Link>

            
          </nav>
        </div>
      </div>
    </div>

   

    <div class="flex flex-col items-center">
    <p id="copyright" class="cursor-default text-center text-xs text-white mt-2">
        © 2020-<span> {currentYear} </span>
        <br/>www.cyberspacedigital.in<br/>Web Development & Designer Community<br/>
        <img
      src={footer_csd}
      className="pt-2 h-12 sm:h-12"
      alt="footer_csd"
      width="200" // Specify the width in pixels or another suitable unit
      height="200" // Specify the height in pixels or another suitable unit
    />
    </p>
</div>

</div>
 
</footer>
<section/>
  

  

  


     
</section>
</main>
  )
}

export default Footer