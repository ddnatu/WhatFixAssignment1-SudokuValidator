app.controller('myCtrl', function($scope) {


    $scope.inputQuery = [];
    $scope.allText = '';
    $scope.totalTestCases = [];

    $scope.isValidSudoku = function(inputTwoDArr) {
        console.log('typeof a inputTwoDArr', inputTwoDArr);
        for(var i = 0; i < inputTwoDArr.length; i++){
            var dupCheck = [];
            
            for(var j = 0; j < inputTwoDArr[0].length; j++){
                if(inputTwoDArr[i][j] !== '.' && dupCheck[inputTwoDArr[i][j]]){
                    return false;
                } else {
                    dupCheck[inputTwoDArr[i][j]] = true;
                }
            }
        }
        for(i = 0; i < inputTwoDArr.length; i++){
            dupCheck = [];
            
            for(j = 0; j < inputTwoDArr[0].length; j++){
                if(inputTwoDArr[j][i] !== '.' && dupCheck[inputTwoDArr[j][i]]){
                    return false;
                } else {
                    dupCheck[inputTwoDArr[j][i]] = true;
                }
            }
        }
        for(i = 0; i < inputTwoDArr.length; i+=Math.sqrt(inputTwoDArr.length)){
            for(j = 0; j < inputTwoDArr.length; j+=Math.sqrt(inputTwoDArr.length)){
                dupCheck = [];
                
                for(var x = 0; x < Math.sqrt(inputTwoDArr.length); x++){
                    for(var y = 0; y < Math.sqrt(inputTwoDArr.length); y++){
                        if(inputTwoDArr[i+x][j+y] !== '.' && dupCheck[inputTwoDArr[i+x][j+y]]){
                            return false;
                        } else {
                            dupCheck[inputTwoDArr[i+x][j+y]] = true;
                        }
                    }
                }
            }
        }
        return true;
    };

    $scope.readFromFile = function(){
        $scope.readTextFile("./data.txt");
        $scope.totalTestCases = $scope.allText.split('\n').filter(function(el) {return el.length != 0});;
        //console.log('totaltestcases', $scope.totalTestCases);
        $scope.totalTestCases.forEach(function(element) {
            //console.log('element', typeof element.split(','));
            var unitTest = element.split(';').filter(function(el) {return el.length != 0});;
            var testArray = unitTest[1].split(',');
            var length = unitTest[0];
            var twoDArray = [];
            //console.log('testArray', testArray);
            for(var i = 0 ; i < parseInt(length)*parseInt(length) ; i+=parseInt(length)){
                var oneDArray = [];
                for(var j = i ; j < i+parseInt(length) ; j++){
                    oneDArray.push(testArray[j]);
                }
                //console.log('oneDArray', oneDArray);
                twoDArray.push(oneDArray);
            }
            //console.log($scope.isValidSudoku(twoDArray));
            alert($scope.isValidSudoku(twoDArray));
            //console.log('twoDArray', twoDArray);
        }, this);
    }

    $scope.readTextFile = function(file){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    $scope.allText = rawFile.responseText;
                    // alert(allText);
                }
            }
        }
        rawFile.send(null);
    }
});
