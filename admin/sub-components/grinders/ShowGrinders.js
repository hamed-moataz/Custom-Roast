"use client";
import { useState,useEffect } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import Image from "next/image";
import { getGrinders,deleteGrinder, editGrinder } from "@/pages/api/api";
import Preloader from "@/src/layouts/Preloader";

export default function CoffeeGrindersPage() {
    const theme = {
        blue: "#134E97",
        white: "#F1F1F1",
        orange: "#F57B35",
      };
  const [grinders, setGrinders] = useState([]);

  const [expandedId, setExpandedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
   const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
  const grindersPerPage = 3;
  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
  useEffect(() => {
    const fetchGrinders = async () => {
      try {
        const data = await getGrinders();
        setGrinders(data);
      } catch (err) {
        console.log('Failed to fetch grinders data!');
      } finally {
        setLoading(false);
      }
    };
    fetchGrinders();
  }, []);
  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const handleDelete = (index) => {
    setShowDeleteBar(true);
    setPendingDeleteIndex(index);
    setTimeout(() => {
      setShowDeleteBar(false);
      setPendingDeleteIndex(null);
    }, 5000);
  };

  const confirmDelete = async () => {
    const grinderToDelete = grinders[pendingDeleteIndex];
    try {
      await deleteGrinder(grinderToDelete._id);
      const updated = grinders.filter((_, i) => i !== pendingDeleteIndex);
      setGrinders(updated);
      showToast('Grinder deleted successfully.', 'success');
    } catch (error) {
      console.error("Delete failed:", error.message);
      
      showToast(error.message || 'Failed to delete grinder.', 'danger');
    } finally {
      setShowDeleteBar(false);
      setPendingDeleteIndex(null);
    }
  };
  

  const cancelDelete = () => {
    setShowDeleteBar(false);
    setPendingDeleteIndex(null);
  };

  const handleEdit = (grinder, index) => {
    setEditData({ ...grinder, index });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const keys = Object.keys(editData.additional_info);
    const key = keys[index];
    let updatedInfo = { ...editData.additional_info };

    if (field === "key") {
      const newInfo = {};
      keys.forEach((k, i) => {
        newInfo[i === index ? value : k] = updatedInfo[k];
      });
      updatedInfo = newInfo;
    } else if (field === "value") {
      updatedInfo[key] = value;
    }

    setEditData((prev) => ({
      ...prev,
      additional_info: updatedInfo,
    }));
  };

  const handleRemoveAdditionalField = (index) => {
    const keys = Object.keys(editData.additional_info);
    const keyToRemove = keys[index];
    const { [keyToRemove]: _, ...rest } = editData.additional_info;
    setEditData((prev) => ({
      ...prev,
      additional_info: rest,
    }));
  };

  const handleAddAdditionalField = () => {
    setEditData((prev) => ({
      ...prev,
      additional_info: {
        ...prev.additional_info,
        [`new_key_${Date.now()}`]: "",
      },
    }));
  };

  const handleAddSubGrinder = () => {
    const newSub = {
      item_id: `new_${Date.now()}`,
      title: "",
      image_url: "",  // empty string or placeholder
      _file: null,     // explicitly tracking image file
    };
    setEditData((prev) => ({
      ...prev,
      subItems: [...prev.subItems, newSub],
    }));
  };
  
  const handleDeleteSubGrinder = (index) => {
    const updatedSubItems = editData.subItems.filter((_, i) => i !== index);
    setEditData((prev) => ({ ...prev, subItems: updatedSubItems }));
  };


  const handleImageChange = (e, type, index = null) => {
    const file = e.target.files[0];
    if (type === "main") {
      setEditData((prev) => ({ ...prev, image_url: file }));
    } else if (type === "sub" && index !== null) {
      const updatedSubs = [...editData.subItems];
      updatedSubs[index]._file = file;
      updatedSubs[index].image_url = URL.createObjectURL(file); // For preview
      setEditData((prev) => ({ ...prev, subItems: updatedSubs }));
    }
  };
  

  const handleEditSave = async () => {
    try {
      setLoading(true);
  
      const grinderData = {
        title: editData.title,
        description: editData.description,
        additional_info: editData.additional_info,
        details: editData.details,
        subItems: editData.subItems.map((sub) => ({
          title: sub.title,
          image_url: sub.image_url instanceof File ? "" : sub.image_url, // Only send URL if it's not a new file
        })),
      };
  
      // Call the API function with grinderId and the full data object
      const updatedGrinder = await editGrinder(editData._id, {
        ...grinderData,
        image_url: editData.image_url instanceof File ? editData.image_url : null,
        subItems: editData.subItems.map((sub) => ({
          title: sub.title,
          image_url: sub.image_url instanceof File ? "" : sub.image_url,
          _file: sub._file, // pass the file to be attached
        })),
      });
  
      // Update state
      setGrinders((prev) => {
        const updated = [...prev];
        updated[editData.index] = updatedGrinder;
        return updated;
      });
  
      setShowEditModal(false);
      setEditData(null);
      showToast('Grinder updated successfully.', 'success');
    } catch (error) {
      console.error("Failed to save grinder edits:", error.message);
      showToast(error.message || 'Failed to update grinder.', 'danger');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
 if (loading) return <Preloader />;
    else {
  const indexOfLastGrinder = currentPage * grindersPerPage;
  const indexOfFirstGrinder = indexOfLastGrinder - grindersPerPage;
  const currentGrinders = grinders.slice(indexOfFirstGrinder, indexOfLastGrinder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4 mt-4">
       <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1050,
          minWidth: '250px',
        }}
      >
        {toast.show && (
          <div className={`toast show text-white bg-${toast.bg}`}>
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white ms-2 mb-1"
                aria-label="Close"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        )}
      </div>
      <h2 className="mb-4" style={{color:theme.blue,textAlign:"center"}}>Coffee Grinders</h2>
      <div className="row mt-7">
        {currentGrinders.map((grinder, index) => (
          <div className="col-md-4 mb-4" key={index} >
            <Card>
              <Card.Img
                variant="top"
                src={grinder.image_url instanceof File ? URL.createObjectURL(grinder.image_url) : `${grinder.image_url}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body style={{backgroundColor:theme.white}}>
                <Card.Title style={{color:theme.orange}}>{grinder.title}</Card.Title>
                <Card.Text style={{color:theme.blue}}>{grinder.description}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button size="sm" onClick={() => toggleExpand(index)}>
                    {expandedId === index ? "Collapse" : "Expand"}
                  </Button>
                  <div>
                    <Button
                    variant="sm"
                      style={{ width: "4rem", height: "2.2rem",fontSize:"14px",color:theme.white, backgroundColor:theme.orange, borderColor:theme.orange }}
                      
                      className="me-2"
                      onClick={() => handleEdit(grinder, index)}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ width: "5rem", height: "2.2rem",fontSize:"14px",backgroundColor:"#dc3545",color:theme.white}}
                      variant="sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {expandedId === index && (
                  <div className="mt-3">
                    {grinder.subItems?.length > 0 && (
                      <>
                        <h5 style={{color:theme.orange}}>Sub Grinders</h5>
                        {grinder.subItems.map((item) => (
                          <div key={item.item_id} className="d-flex align-items-center mb-2 border p-2 rounded">
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              width={60}
                              height={60}
                              className="me-2 rounded"
                            />
                            <span style={{color:theme.blue}}>{item.title}</span>
                          </div>
                        ))}
                      </>
                    )}

                    {grinder.additional_info && (
                      <div className="mt-3">
                        <h5 style={{color:theme.orange}}>Additional Info</h5>
                        <ul className="mb-0">
                          {Object.entries(grinder.additional_info).map(([key, val], idx) => (
                            <li key={idx} style={{color:theme.blue}}>
                              <strong>{key.replace(/_/g, " ")}:</strong> {val}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-7">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{backgroundColor:theme.orange, borderColor:theme.white}}
        >
          Previous
        </Button>
        <span className="mx-3" style={{color:theme.white,margin:"auto"}}>{`Page ${currentPage}`}</span>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * grindersPerPage >= grinders.length}
          style={{backgroundColor:theme.orange,borderColor:theme.white}}
        >
          Next
        </Button>
      </div>

 {/* Delete Confirmation Bar */}
      {showDeleteBar && (
        <div
          className="d-flex justify-content-between align-items-center p-3 bg-danger text-white rounded mt-3"
          style={{
            position: "fixed",
            bottom: 20,
            left: "5%",
            right: "5%",
            zIndex: 1000,
            width: "60%",
          }}
        >
          <span>Are you sure you want to delete this grinder?</span>
          <div className="d-flex gap-2">
            <Button variant="light" size="sm" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="dark" size="sm" onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Grinder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={editData.title} onChange={handleEditChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" value={editData.description} onChange={handleEditChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Main Image</Form.Label>
                <Form.Control type="file" onChange={(e) => handleImageChange(e, "main")} />
              </Form.Group>

              <Form.Label>Additional Info</Form.Label>
              {Object.entries(editData.additional_info).map(([key, val], idx) => (
                <div className="d-flex align-items-center mb-2" key={idx}>
                  <Form.Control
                    className="me-2"
                    value={key}
                    onChange={(e) => handleAdditionalInfoChange(idx, "key", e.target.value)}
                    placeholder="Key"
                  />
                  <Form.Control
                    className="me-2"
                    value={val}
                    onChange={(e) => handleAdditionalInfoChange(idx, "value", e.target.value)}
                    placeholder="Value"
                  />
                  <Button variant="danger" size="sm" onClick={() => handleRemoveAdditionalField(idx)}>
                    &times;
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={handleAddAdditionalField}>
                + Add Field
              </Button>

              <p className="mt-4" style={{color:"black"}}>Sub Grinders</p>
{editData.subItems.map((sub, idx) => (
  <div key={idx} className="border p-2 rounded mb-2">
    <Form.Group className="mb-2">
      <Form.Label>Sub Title</Form.Label>
      <Form.Control
        value={sub.title}
        onChange={(e) => {
          const updated = [...editData.subItems];
          updated[idx].title = e.target.value;
          setEditData((prev) => ({ ...prev, subItems: updated }));
        }}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Label>Sub Image</Form.Label>
      <Form.Control type="file" onChange={(e) => handleImageChange(e, "sub", idx)} />
    </Form.Group>
    <Button variant="danger" size="sm" onClick={() => handleDeleteSubGrinder(idx)}>
      Delete Sub Grinder
    </Button>
  </div>
))}
              <Button variant="success" size="sm" onClick={handleAddSubGrinder}>
                + Add Sub Grinder
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleEditSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}}
