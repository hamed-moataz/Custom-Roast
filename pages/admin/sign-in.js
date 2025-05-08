import { useState } from "react";
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "@/admin/layouts/AuthLayout";
import { loginAdmin } from "../api/api";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const data = await loginAdmin(username, password);
      // You can store the token if needed (e.g., in localStorage or cookie)
      localStorage.setItem("adminToken", data.token);

      // Redirect to admin machines page
      router.push("/admin/machines");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={5} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <Image src="/images/logo1.png" className="mb-2" style={{ width: "40%" }} alt="Logo" />
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
  <Form.Label>Username</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />
</Form.Group>


              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="**************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid mt-6">
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
