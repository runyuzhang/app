College = new Meteor.Collection("colleges")

if (Meteor.isClient) {
  Template.drink.greeting = function () {
    return "Welcome to app.";
  }

  Template.drink.colleges = function() {
    return College.find({});
  }

  Template.drink.events({
    'click #Berkeley': function () {
      College.update({_id:College.findOne({name:'Berkeley'})['_id']}, {$inc: {donation: 1}});
    },
    'click #Stanford': function () {
      College.update({_id:College.findOne({name:'Stanford'})['_id']}, {$inc: {donation: 1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (College.find().count() == 0){
      College.insert({name: "Berkeley", donation: 0});
      College.insert({name: "Stanford", donation: 0});
    }
  });
}
