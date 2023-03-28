import React from "react";
// import CommentsContainer from "../comments/CommentsContainer";
import "./RoverCard.css";

class RoverCard extends React.Component {

  displayDate = (date) => {
    const [year, month, day] = date.split("-")
    return month + "/" + day + "/" + year;
  }

  render() {
    return (
      <div
        className="RoverCard"
        id={this.props.id}
        key={this.props.id}
        roverid={this.props.id}
        onClick={this.props.revealShow}
      >

        <div className="details" roverid={this.props.id}>
          <h1 className="RoverCard" roverid={this.props.id}>{this.props.name}</h1>
          <img
            alt={`Mars rover, ${this.props.name}`}
            className="RoverCard"
            roverid={this.props.id}
            src={this.props.profile_pic}
          />
          <p className="RoverCard" roverid={this.props.id}>Mission {this.props.status}</p>
          <p className="RoverCard" roverid={this.props.id}>Launched {this.displayDate(this.props.launch_date)}</p>
          <p className="RoverCard" roverid={this.props.id}>Landed {this.displayDate(this.props.landing_date)}</p>
        </div>
        {/* <CommentsContainer comments={this.props.comments} roverId={this.props.external_id} /> */}

      </div>

    );
  };

};

export default RoverCard;