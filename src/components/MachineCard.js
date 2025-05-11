"use client";
import { useState } from "react";
import Link from 'next/link'

export default function MachineCard() {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <div className="col-6 col-sm-6 col-md-4 col-lg-3 mt-2 ">
        <h4 className="text-center">Machines & Supplies</h4>
        <div
          className="card test-model"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/images/service1.jpg"
            alt="image"
            className="icard-img-top"
          />
          <h5 className="text-center mt-2" style={{ fontSize: "1.5rem" }}>
            Machines & Supplies
          </h5>
          <div className="card-body">
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
          </div>
          <div className="overlay"></div>
        </div>
      </div>

      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            onClick={() => setShowModal(false)} // كليك في أي مكان برة يقفل
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Machines & Supplies</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row text-center">
                    <div className="col-md-6 mb-3">
                      <Link href='commercialCoffeeMachines'>
                      <img src="/images/service1.jpg" />
                      <h6 className="mt-2 fs-4">Machine</h6>
                      </Link>
                    </div>
                    <div className="col-md-6 mb-3">
                      <Link href='professionalHomeMachines'>
                      <img src="/images/service2.jpg" />
                      <h6 className="mt-2 fs-4 ">Supplies </h6>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}
    </>
  );
}
