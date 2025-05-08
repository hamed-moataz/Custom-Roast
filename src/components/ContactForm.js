import { Formik } from 'formik';

const ContactForm = () => {
  
  const formData = {
    "formspreeURL": "https://formspree.io/f/mpwpyeoz"
  }
  
  return (
    <>
      <Formik
        initialValues = {{ email: '', name: '', tel: '', subject: '', message: '' }}
        validate = { values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit = {( values, { setSubmitting, resetForm } ) => {
            const form = document.getElementById("contactForm");
            const status = document.getElementById("contactFormStatus");
            const data = new FormData();

            data.append('name', values.name);
            data.append('email', values.email);
            data.append('tel', values.tel);
            data.append('subject', values.subject);
            data.append('message', values.message);

            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                console.log(response);
                if (response.ok) {
                    resetForm();
                    status.innerHTML = "Thanks for your submission!";
                    status.style.display = 'block';
                    form.style.display = 'none';

                    setTimeout(function(){
                      status.style.display = 'none';
                      form.style.display = 'block';
                    }, 4000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            status.innerHTML = "Oops! There was a problem submitting your form"
                        }
                    })
                }
            }).catch(error => {
                status.innerHTML = "Oops! There was a problem submitting your form"
            });

            setSubmitting(false);
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} id="contactForm" action={formData.formspreeURL}>
          <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <div className="kf-field blueColor">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                     className='blueColor formBlue'
                  />
                  <i className="far fa-user  blueColor" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <div className="kf-field">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                     className='blueColor formBlue'
                  />
                  <i className="fas fa-at  blueColor" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <div className="kf-field">
                  <input 
                    type="tel" 
                    name="tel" 
                    placeholder="Phone Number" 
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tel}
                     className='blueColor formBlue'
                  />
                  <i className="fas fa-mobile-alt  blueColor" />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="kf-field">
                  <input 
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                      className='blueColor formBlue'
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="kf-field">
                  <textarea
                    name="message"
                    placeholder="Message"
                    defaultValue={""}
                    required="required" 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                     className='blueColor formBlue'
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="kf-bts">
                  <button
                    type="submit"
                    className="kf-btn blueHover"
                  >
                    <span>Send us message</span>
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>

        </form>
        )}
      </Formik>
      <div className="alert-success" style={{ display: "none" }} id="contactFormStatus">
        <p>Thanks, your message is sent successfully.</p>
      </div>
    </>
  );
};
export default ContactForm;
