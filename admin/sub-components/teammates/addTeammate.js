import React, { useState } from 'react';
import { Button, Form, Card, Image } from 'react-bootstrap';
import { addTeammate } from '@/pages/api/api';
const AddTeammate = ({ onAdd }) => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
}; 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !role) {
      alert('Please fill in name and role.');
      return;
    }

    try {
      setLoading(true);

      const teammateData = {
        name,
        role,
        image_url: imageFile, // actual file
      };

      const addedTeammate = await addTeammate(teammateData);
      onAdd(addedTeammate); // inform parent of new teammate
      showToast('Teammate added successfully.', 'success');
      handleReset();
    } catch (error) {
      showToast(error.message || 'Failed to add teammate.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setRole('');
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="p-3 my-4 mb-9">
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
      <h4 className="mb-3" style={{ color: theme.blue }}>Add Teammate</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: theme.orange }}>Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter teammate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: theme.orange }}>Role *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: theme.orange }}>Image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <div className="mt-2">
              <Image src={previewUrl} thumbnail height={120} />
            </div>
          )}
        </Form.Group>

        <div className="d-flex gap-2" style={{justifyContent:"flex-end"}}>
        <Button type="button" variant="secondary" onClick={handleReset} style={{borderColor:theme.white}}>Cancel</Button>
          <Button type="submit" variant="primary" style={{backgroundColor:theme.orange, borderColor:theme.white}}>Add Teammate</Button>
        </div>
      </Form>
    </Card>
  );
};

export default AddTeammate;
