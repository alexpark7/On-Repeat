(function(){
    scotchApp.controller('ChatCtrl', function($scope, $timeout, MessageService){

            $scope.currentUser = null;
            $scope.currentText = null;
            $scope.messages = [];

            MessageEvent.childAdded(function(addedChild){
                $scope.messages.push(addedChild);
            });

            $scope.sendMessage = function(){
                var newMessage = {
                    user: $scope.currentUser,
                    text: $scope.currentText
                };

                var promise = MessageService.add(newMessage);
                promise.then(function(data){
                    console.log(data.name());
                });
            };

            $scope.turnFeedOff = function() {
                MessageService.off();
            };

            $scope.pageNext = function(){
                var lastItem = $scope.messages[$scope.messages.length -1];
                MessageService.pageNext(lastItem.name, 10).then(function(messages){
                    $scope.messages = messages;
                });
            }
        })
}());