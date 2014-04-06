College = new Meteor.Collection("colleges")
Personal = new Meteor.Collection("attributes")

if (Meteor.isClient) {
  Template.drink.greeting = function () {
    return "Drink up!";
  }

  Template.drink.user = function() {
    console.log("hello world");
    return Meteor.user().emails[0].address();
  }

  Template.stats.colleges = function() {
    return College.find({});
  }

  Template.drink.events({
    'click #Berkeley': function () {

      College.update({_id:College.findOne({name:'Berkeley'})['_id']}, {$inc: {donation: 1}});
    },
    'click #Stanford': function () {
      College.update({_id:College.findOne({name:'Stanford'})['_id']}, {$inc: {donation: 1}});
    },
    'click': function () {
      Personal.update({_id:Meteor.user()._id},{$inc: {donation: 1}}, {upsert:true});
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

Router.map(function() {
  this.route('drink')
  this.route('stats')
  this.route('personal')
});


