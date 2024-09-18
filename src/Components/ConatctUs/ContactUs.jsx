export default function ContactUs() {
  return (
    <div className="layout pb-32">
      <section className="mb-32">
        <div
          id="map"
          className="relative h-[300px] overflow-hidden bg-cover bg-[50%] bg-no-repeat"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="100%"
            height="480"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="container px-6 md:px-12">
          <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
            <div className="flex flex-wrap">
              <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                <form>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      className="peer block w-full rounded border-2 border-gray-300 bg-transparent py-3 px-3 leading-tight outline-none transition-all duration-200 ease-linear focus:border-primary focus:text-primary"
                      id="exampleInput90"
                    />
                    <label
                      className="bg-[#e8f0fd] px-1 pointer-events-none absolute top-0 left-3 mt-2 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-primary"
                      htmlFor="exampleInput90"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="email"
                      className="peer block w-full rounded border-2 border-gray-300 bg-transparent py-3 px-3 leading-tight outline-none transition-all duration-200 ease-linear focus:border-primary focus:text-primary"
                      id="exampleInput91"
                    />
                    <label
                      className="bg-[#fbfbf8] px-1 pointer-events-none absolute top-0 left-3 mt-2 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-primary"
                      htmlFor="exampleInput91"
                    >
                      Email address
                    </label>
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <textarea
                      className="peer block w-full rounded border-2 border-gray-300 bg-transparent py-3 px-3 leading-tight outline-none transition-all duration-200 ease-linear focus:border-primary focus:text-primary"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="bg-[#fffdf8] px-1 pointer-events-none absolute top-0 left-3 mt-2 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-primary"
                    >
                      Message
                    </label>
                  </div>
                  <div className="mb-6 flex items-center">
                    <input
                      className="relative mt-1 mr-2 h-4 w-4 rounded border border-gray-300 bg-transparent checked:bg-primary checked:border-primary"
                      type="checkbox"
                      value=""
                      id="exampleCheck96"
                    />
                    <label
                      className="text-neutral-500"
                      htmlFor="exampleCheck96"
                    >
                      I agree to the terms and conditions.
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded bg-primary px-6 py-2 text-xs font-medium uppercase text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700"
                  >
                    Send
                  </button>
                </form>
              </div>
              <div className="w-full shrink-0 grow-0 basis-auto md:px-3 lg:w-7/12 lg:px-6">
                <div className="flex flex-col md:flex-row lg:mb-12">
                  <div className="relative mb-6 flex items-start md:mb-0">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-white">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="home"
                        className="w-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M504 233.5l-8.5-8.6-216-216c-6.2-6.2-16.4-6.2-22.6 0l-216 216-8.5 8.6c-4.7 4.7-4.9 12.2-0.5 16.9 4.8 4.8 12.3 4.8 17.2 0l10.5-10.5V464c0 13.3 10.7 24 24 24h320c13.3 0 24-10.7 24-24V239.4l10.5 10.5c4.8 4.8 12.3 4.8 17.2 0 4.4-4.7 4.2-12.2-0.5-16.9z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-12">
                      <p className="mb-2 text-lg font-semibold">Our Office</p>
                      <p className="text-neutral-500">
                        3979 8th St NW, Washington, D.C. 20011, USA
                      </p>
                    </div>
                  </div>
                  <div className="relative mb-6 flex items-start md:mb-0">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-white">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="phone"
                        className="w-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M493.3 374.5l-90.7-33.4c-9.6-3.7-20.1 1.1-23.9 11.5l-33.1 85.6c-3.7 9.6 1.1 20.1 11.5 23.9l90.7 33.4c9.6 3.7 20.1-1.1 23.9-11.5l33.1-85.6c3.7-9.6-1.1-20.1-11.5-23.9zM132.7 55.1l-90.7 33.4c-9.6 3.7-15.2 14.3-11.5 23.9l33.1 85.6c3.7 9.6 14.3 15.2 23.9 11.5l90.7-33.4c9.6-3.7 15.2-14.3 11.5-23.9l-33.1-85.6c-3.7-9.6-14.3-15.2-23.9-11.5z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-12">
                      <p className="mb-2 text-lg font-semibold">Phone</p>
                      <p className="text-neutral-500">+1 234 567 890</p>
                    </div>
                  </div>
                  <div className="relative mb-6 flex items-start md:mb-0">
                    <div className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-white">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="envelope"
                        className="w-4"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M502.6 190.7l-192-136c-11.5-8.4-27.3-8.4-38.8 0l-192 136c-11.5 8.4-11.5 22.1 0 30.5l192 136c11.5 8.4 27.3 8.4 38.8 0l192-136c11.5-8.4 11.5-22.1 0-30.5zM256 261.1l-150.2-108.7 24.3-17.4 121.3 88.3 121.3-88.3 24.3 17.4L256 261.1zM486.6 322.2l-104.2 74.3-53.4-40.4 85.3-60.2 53.4 40.4-104.2-74.3 85.3-60.2 104.2 74.3-85.3 60.2 85.3 60.2 104.2-74.3z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-12">
                      <p className="mb-2 text-lg font-semibold">Email</p>
                      <p className="text-neutral-500">contact@yourdomain.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
