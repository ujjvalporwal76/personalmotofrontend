import React, { useState } from "react";
import "./Adplanpage.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Navbar from "../NavBar/Navbar";
import { Col, Row, Card, Button, Flex } from "antd";
import Homefooter from "../HomeFooter/Homefooter";
import axios from "../../axios/axios.config";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function Adplanpage() {
  const adId = useParams();
  const navigate = useNavigate();
  console.log(adId.adId);
  const [chosenPlan, setChosenPlan] = useState({
    adId: adId.adId,
    column: "",
    plan: 1,
    pointsPerDay: 1,
    totalPoints: 1,
  });
  const handleChoosePlan = (plan) => {
    setChosenPlan({
      adId: adId.adId,
      column: plan.column,
      plan: plan.plan,
      pointsPerDay: plan.pointsPerDay,
      totalPoints: parseFloat((plan.plan * plan.pointsPerDay).toFixed(2)),
    });
    // console.log(chosenPlan);
  };
  const sendChosenPlanData = async () => {
    try {
      const response = await axios.post("/plans/confirm", chosenPlan, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        withCredentials: true,
      });

      const data = response.data;
      console.log(data);
      if (response.status === 201) {
        toast.success("Your Plan is confirmed");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Not Enough Points!");
    }
  };

  // handle the response from the backend

  return (
    <div className="plan-page">
      <Navbar />
      <Row className="ad-plan-row">
        <Col span={16}>
          <h3 className="ad-plan-heading">
            Choose the package that suits you best
          </h3>
        </Col>

        <Col span={16}>
          <h3 className="select-plan-heading">Top of the list Plans</h3>
          <Card
            className={
              chosenPlan.column === "top" && chosenPlan.plan === 7
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">7 days</span>
                <div className="plan-days-span">Post an ad for 7 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">3.00 points/day</span>
                <p className="plan-price-total">21.00 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "top",
                      plan: 7,
                      pointsPerDay: 3.0,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Card
            className={
              chosenPlan.column === "top" && chosenPlan.plan === 15
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">15 days</span>
                <div className="plan-days-span">Post an ad for 15 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.70 points/day</span>
                <p className="plan-price-total">40.50 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "top",
                      plan: 15,
                      pointsPerDay: 2.7,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Card
            className={
              chosenPlan.column === "top" && chosenPlan.plan === 30
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">30 days</span>
                <div className="plan-days-span">Post an ad for 30 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.5 points/day</span>
                <p className="plan-price-total">75.00 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "top",
                      plan: 30,
                      pointsPerDay: 2.5,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Button href="#" type="link" className="plan-cancel-btn">
            Cancel
          </Button>
          <Button className="plan-confirm-btn" onClick={sendChosenPlanData}>
            Confirm Plan
          </Button>
        </Col>

        <Col span={16}>
          <h3 className="select-plan-heading">Featured list Plans</h3>
          <Card
            className={
              chosenPlan.column === "featured" && chosenPlan.plan === 7
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">7 days</span>
                <div className="plan-days-span">Post an ad for 7 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.80 points/day</span>
                <p className="plan-price-total">19.60 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "featured",
                      plan: 7,
                      pointsPerDay: 2.8,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Card
            className={
              chosenPlan.column === "featured" && chosenPlan.plan === 15
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">15 days</span>
                <div className="plan-days-span">Post an ad for 15 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.50 points/day</span>
                <p className="plan-price-total">37.50 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "featured",
                      plan: 15,
                      pointsPerDay: 2.5,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Card
            className={
              chosenPlan.column === "featured" && chosenPlan.plan === 30
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">30 days</span>
                <div className="plan-days-span">Post an ad for 30 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.00 points/day</span>
                <p className="plan-price-total">60.00 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "featured",
                      plan: 30,
                      pointsPerDay: 2.0,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Button href="#" type="link" className="plan-cancel-btn">
            Cancel
          </Button>
          <Button className="plan-confirm-btn" onClick={sendChosenPlanData}>
            Confirm Plan
          </Button>
        </Col>

        <Col span={16}>
          <h3 className="select-plan-heading">Standard list Plans</h3>
          <Card
            className={
              chosenPlan.column === "standard" && chosenPlan.plan === 7
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">7 days</span>
                <div className="plan-days-span">Post an ad for 7 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.50 points/day</span>
                <p className="plan-price-total">17.50 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "standard",
                      plan: 7,
                      pointsPerDay: 2.5,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Card
            className={
              chosenPlan.column === "standard" && chosenPlan.plan === 15
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">15 days</span>
                <div className="plan-days-span">Post an ad for 15 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">2.00 points/day</span>
                <p className="plan-price-total">30.00 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "standard",
                      plan: 15,
                      pointsPerDay: 2.0,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Card
            className={
              chosenPlan.column === "standard" && chosenPlan.plan === 30
                ? "ant-card-selected"
                : ""
            }
          >
            <Flex justify="space-between">
              <div className="plan-days-box">
                <span className="plan-days">30 days</span>
                <div className="plan-days-span">Post an ad for 30 days</div>
              </div>

              <div className="plan-price-box">
                <span className="plan-price">1.5 points/day</span>
                <p className="plan-price-total">45.00 points total</p>
              </div>
              <div className="plan-choose-btn-box">
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    handleChoosePlan({
                      column: "standard",
                      plan: 30,
                      pointsPerDay: 1.5,
                    })
                  }
                >
                  Choose
                </Button>
              </div>
            </Flex>
          </Card>
          <Button href="#" type="link" className="plan-cancel-btn">
            Cancel
          </Button>
          <Button className="plan-confirm-btn" onClick={sendChosenPlanData}>
            Confirm Plan
          </Button>
        </Col>
      </Row>
      <Homefooter />
    </div>
  );
}

export default Adplanpage;
