angular.module('i4mi', ['i4mi.templates','i4mi.defaults','ionic','ionic-datepicker','ionic-timepicker','ngStorage','mdo-angular-cryptography','jsonFormatter'])

/******************************************************/
/* controllers */
/******************************************************/
.controller('I4MIMidataLoginController', ['$scope','I4MIMidataService','$timeout',function($scope, I4MIMidataService, $timeout) {
	$scope.currentUser = I4MIMidataService.currentUser();
	$scope.loggedIn = I4MIMidataService.loggedIn();
	
	$scope.login = function(user) {
		I4MIMidataService.auth(user).then(function(credentials) {
			if ( credentials.authorized ) {
				$scope.info = {
					text: credentials.info,
					type: 'balanced'
				}
				$timeout(function(){
					$scope.closeModal();
					$scope.info = false;
					$scope.loggedIn = true;
					$scope.currentUser = user.username;
				},700);
			} else {
				$scope.loggedIn = I4MIMidataService.loggedIn();
				$scope.info = {
					text: credentials.info,
					type: 'energized'
				}
			}
		},function(reason) {
			$scope.loggedIn = I4MIMidataService.loggedIn();
			$scope.info = {
				text: reason,
				type: 'assertive'
			}
		});
	}
	
	$scope.logout = function() {
		I4MIMidataService.logout();
		$scope.loggedIn = false;
		$scope.currentUser = '';
	}
	
	$scope.userFields = [
		{
			key: 'username',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'Email address',
				placeholder: 'hello@example.org'
			}
		},
		{
			key: 'password',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'Password',
				placeholder: '•••••••••••'
			}
		},
		{
			key: 'server',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'MIDATA Server',
				placeholder: 'https://test.midata.coop:9000'
			}
		}
	]
}])

.controller('I4MIMidataEntryController', ['$scope','$timeout','$ionicPopup','I4MIMidataService','ionicDatePicker',function($scope, $timeout, $ionicPopup, I4MIMidataService, ionicDatePicker) {
	var datePickerCallback = function(date) {
		date = new Date(date);
		$scope.datetime.setFullYear(date.getFullYear());
		$scope.datetime.setMonth(date.getMonth());
		$scope.datetime.setDate(date.getDate());
	}
	$scope.openDatePicker = function(){
		ionicDatePicker.openDatePicker({
			callback: datePickerCallback,
			inputDate: $scope.datetime
		});
	}
	
	var timePickerCallback = function(time) {
		time = new Date(time*1000);
		$scope.datetime.setHours(time.getUTCHours());
		$scope.datetime.setMinutes(time.getUTCMinutes());
		$scope.tpo.inputEpochTime = $scope.datetime.getHours()*60*60 + $scope.datetime.getMinutes()*60
	}
	
	var clear = function() {
		$scope.model = {};
		$scope.datetime = new Date();
		$scope.datetime.setSeconds(0);
		$scope.datetime.setMilliseconds(0);
		if ( $scope.native !== 'true' ) {
			$scope.datetime.setMinutes(Math.round($scope.datetime.getMinutes()/5)*5);
		}
	}
	clear();
	
	$scope.tpo = {
		callback: timePickerCallback,
		inputEpochTime: $scope.datetime.getHours()*60*60 + $scope.datetime.getMinutes()*60,
		step: 5
	}
	
	var setValue = function(tmpEntry, entry) {
		var path = tmpEntry.$set.split('.');
		var set = [tmpEntry.$scheme];
		for ( index in path ) {
			set.push( set[index][path[index]] );
		}
		set[set.length - 1] = JSON.stringify(entry);
		for ( index in path ) {
			set[path.length - 1 - index][path[path.length - 1 - index]] = set[path.length - index];
		}
		return tmpEntry.$scheme;
	}
	
	$scope.add = function(entry) {
		var midataEntry = [];
		if ( $scope.groupEntry === 'true' || $scope.groupEntry === true ) {
			var tmpEntry = JSON.parse(JSON.stringify($scope.fhir));
			tmpEntry = setValue(tmpEntry, entry);
			tmpEntry.data.effectiveDateTime = $scope.datetime;
			midataEntry.push(tmpEntry);
		} else {
			for (field in entry) {
				if ( !entry.hasOwnProperty(field) ) continue;
				if ( !entry[field] || entry[field] === '' ) continue;
				var tmpEntry = JSON.parse(JSON.stringify($scope.fhir[field]));
				tmpEntry = setValue(tmpEntry, entry[field]);
				tmpEntry.data.effectiveDateTime = $scope.datetime;
				midataEntry.push(tmpEntry);
			}
		}
		I4MIMidataService.add(midataEntry).then(function(result) {
			if ( result.success ) {
				$scope.info = {
					text: result.info,
					type: 'balanced'
				}
				$timeout(function(){
					$scope.closeModal();
					if ( $scope.clear === 'true' ) {
						clear();
					}
				},700);
			} else {
				$scope.info = {
					text: result.info,
					type: 'energized'
				}
			}
		},function(reason) {
			$scope.info = {
				text: reason,
				type: 'assertive'
			}
		});
	}
}])

.controller('I4MIMidataChartController', ['$scope',function($scope) {
	var interval;
	var groupdate;
	if ( $scope.interval === 'second' ) {
		interval = 19;
		groupdate = function(d) {
			d.setMilliseconds(0);
			return d;
		}
	} else if ( $scope.interval === 'minute' ) {
		interval = 16;
		groupdate = function(d) {
			d.setMilliseconds(0);
			d.setSeconds(0);
			return d;
		}
	} else if ( $scope.interval === 'hour' ) {
		interval = 16;
		groupdate = function(d) {
			d.setMilliseconds(0);
			d.setSeconds(0);
			d.setMinutes(0);
			return d;
		}
	} else if ( $scope.interval === 'day' ) {
		interval = 10;
		groupdate = function(d) {
			d.setMilliseconds(0);
			d.setSeconds(0);
			d.setMinutes(0);
			d.setHours(0);
			return d;
		}
	} else if ( $scope.interval === 'month' ) {
		interval = 7;
		groupdate = function(d) {
			d.setMilliseconds(0);
			d.setSeconds(0);
			d.setMinutes(0);
			d.setHours(0);
			d.setDate(1)
			return d;
		}
	} else if ( $scope.interval === 'year' ) {
		interval = 4;
		groupdate = function(d) {
			d.setMilliseconds(0);
			d.setSeconds(0);
			d.setMinutes(0);
			d.setHours(0);
			d.setDate(1);
			d.setMonth(1);
			return d;
		}
	} else {
		interval = 30;
		groupdate = function(d) {
			return d;
		}
	}
	
	var options = {
		chart: {
			type: $scope.type || 'lineChart',
			height: window.innerHeight / 3,
			margin : {
			    top: 20,
			    right: 50,
			    bottom: 30,
			    left: 50
			},
			useInteractiveGuideline: true,
			showValues: true,
			valueFormat: function(d){
			    return d;
			},
			xAxis: {
			    tickFormat: function(d){
			    	if ( options.chart.type !== 'discreteBarChart' ) {
				    	d = (new Date(d)).toJSON();
				    	d = d.substring(0, interval).replace(/T/,' ');
				    }
			        return d;
			    }
			},
			yAxis: {
			    tickFormat: function(d){
			    	return Math.round(d,2);
			    }
			}
		}
	}
	$scope.options = options;
	
	$scope.$watch('records', function(){
		var groups = {};
		for ( index in $scope.records ) {
			var record = $scope.records[index];
			if ( !record.data || !record.data.valueQuantity ) continue;
			if ( isNaN(record.data.valueQuantity.value) ) continue;
			if ( !record.data.effectiveDateTime ) continue;
			if ( record.data.status === 'entered-in-error' ) continue;
			
			var key = record.name || 'records';
			if ( !groups[key] ) {
				groups[key] = {
					name: record.name || '',
					unit: record.data.valueQuantity.unit,
					data: {}
				};
			}
			var datetime = groupdate(new Date(record.data.effectiveDateTime));
			var timekey;
			if ( options.chart.type === 'discreteBarChart' ) {
				timekey = 'all';
			} else {
				timekey = datetime.toJSON();
			}
			var group = groups[key].data[timekey] || {
				value: 0,
				count: 0,
				first: record.data.valueQuantity.value,
				xtime: datetime.getTime()
			}
			group.value += record.data.valueQuantity.value*1;
			group.count += 1;
			groups[key].data[timekey] = group;
		}
		
		var data = [];
		for ( key in groups ) {
			if ( !groups.hasOwnProperty(key) ) continue;
			var collection = groups[key];
			var values = [];
			for ( timekey in collection.data ) {
				if ( !collection.data.hasOwnProperty(timekey) ) continue;
				group = collection.data[timekey];
				var y;
				if ( $scope.operation === 'sum' ) {
					y = group.value;
				} else if ( $scope.operation === 'avg' ) {
					y = group.value / group.count;
				} else {
					y = group.first;
				}
				values.push({
					x: group.xtime,
					y: y
				});
			}
			var set;
			if ( options.chart.type === 'discreteBarChart' ) {
				values[0].x = collection.name;
				set = {
					key: collection.name + " [" + collection.unit + "]",
					values: values
				}
			} else {
				set = {
					key: collection.name + " [" + collection.unit + "]",
					values: values
				}
			}
			set.values.sort(function(a,b) {
				if (a.x < b.x) {
					return -1;
				} else if (a.x > b.x) {
					return 1;
				} else {
					return 0;
				}
			});
			data.push(set);
		}
		
		$scope.data = data;
	});
}])

/******************************************************/
/* directives */
/******************************************************/
.directive('i4miChart', [function(){
	return {
		restrict: 'E',
		scope: {
			type: '@',
			records: '=',
			options: '=?',
			interval: '@',
			operation: '@'
		},
		controller : "@",
		name: "controllerName",
		link: function(scope, element, attrs) {
			
		},
		templateUrl: 'i4mi.midata.chart.html'
	};
}])

.directive('i4miList', ['I4MIMidataService',function(I4MIMidataService){
	return {
		restrict: 'E',
		scope: {
			records: '=',
			canSwipe: '@canRemove',
			showKey: '@',
			keys: '@',
			templateUrl: '@'
		},
		link: function(scope, element, attrs) {
			scope.shouldShow = function(key) {
				return !attrs.keys || (attrs.keys+',').indexOf(key+',') !== -1;
			}
			scope.remove = function(record) {
				record.data.status = 'entered-in-error';
				I4MIMidataService.update(record);
			}
		},
		templateUrl: 'i4mi.midata.list.html'
	};
}])

.directive('i4miMidataLogin', [function(){
	return {
		restrict: 'E',
		scope: {
			user: '='
		},
		controller : "@",
		name: "controllerName",
		templateUrl: 'i4mi.midata.login.html',
		link: function(scope, element, attrs) {
			scope.viewClass = 'widget';
			scope.openModal = function(){};
			scope.closeModal = function(){};
		}
	};
}])

.directive('i4miMidataLogout', [function(){
	return {
		restrict: 'E',
		scope: {},
		controller : "@",
		name:"controllerName",
		templateUrl: 'i4mi.midata.logout.html',
		link: function(scope, element, attrs) {
			scope.viewClass = 'widget';
			scope.openModal = function(){};
			scope.closeModal = function(){};
		}
	};
}])

.directive('i4miMidataEntry', [function(){
	return {
		restrict: 'E',
		scope: {
			model: '=',
			schema: '=fields',
			fhir: '=',
			groupEntry: '@',
			clear: '@',
			native: '@'
		},
		controller : "@",
		name: "controllerName",
		templateUrl: 'i4mi.midata.entry.html',
		link: function(scope, element, attrs) {
			scope.viewClass = 'widget';
			scope.openModal = function(){};
			scope.closeModal = function(){
				scope.info = undefined;
			};
		}
	};
}])

.directive('i4miHealthkitImport', ['I4MIHealthKitService',function(I4MIHealthKitService){
	return {
		restrict: 'E',
		scope: {
			types: '=',
			choice: '@',
			options: '=',
			import: '='
		},
		link: function(scope, element, attrs) {
			scope.import = function() {
				var tps = [];
				for ( var t in types ) {
					if ( types[t] ) {
						tps.push(t);
					}
				}
				I4MIHealthKitService.importRecords(tps, options);
			}
		},
		templateUrl: 'i4mi.healthkit.import.html'
	};
}])

.directive('i4miCcdaImport', ['I4MICcdaService',function(I4MICcdaService){
	return {
		restrict: 'E',
		scope: {
			url: '=',
			display: '@',
			callback: '=',
			action: '=',
			actionText: '@'
		},
		link: function(scope, element, attrs) {
			scope.import = function(url) {
				I4MICcdaService.importRecord(url).then(function(r){
					scope.record = r;
					if ( typeof scope.callback === 'function' ) {
						scope.callback(r);
					}
				},function(){});
			}
			scope.continue = function(record) {
				if ( typeof scope.action === 'function' ) {
					scope.action(record);
				}
				scope.record = null;
			}
		},
		templateUrl: 'i4mi.ccda.import.html'
	};
}])

/******************************************************/
/* services */
/******************************************************/
.service('I4MIModalService', ['$ionicModal','$rootScope','$q','$injector','$controller',function($ionicModal, $rootScope, $q, $injector, $controller) {

	return {
		show: show
	}

	function show(templateUrl, controller, scope, parameters) {
		// Grab the injector and create a new scope
		var deferred = $q.defer(),
			ctrlInstance,
			modalScope = $rootScope.$new(),
		thisScopeId = modalScope.$id;
		for (var prop in scope) {
			if (!scope.hasOwnProperty(prop)) continue;
			modalScope[prop] = scope[prop];
		}	

		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: modalScope,
			animation: parameters.animation || 'slide-in-up',
			focusFirstInput: parameters.focusFirstInput,
			backdropClickToClose: parameters.backdropClickToClose,
			hardwareBackButtonClose: parameters.hardwareBackButtonClose
		}).then(function (modal) {
			modalScope.modal = modal;

			modalScope.openModal = function () {
				modalScope.modal.show();
			};
			modalScope.closeModal = function (result) {
				deferred.resolve(result);
				modalScope.modal.hide();
			};
			modalScope.$on('modal.hidden', function (thisModal) {
				if (thisModal.currentScope) {
					var modalScopeId = thisModal.currentScope.$id;
					if (thisScopeId === modalScopeId) {
						deferred.resolve(null);
						_cleanup(thisModal.currentScope);
					}
				}
			});

			// Invoke the controller
			var locals = { '$scope': modalScope, 'parameters': parameters };
			var ctrlEval = _evalController(controller);
			ctrlInstance = $controller(controller, locals);
			if (ctrlEval.isControllerAs) {
				ctrlInstance.openModal = modalScope.openModal;
				ctrlInstance.closeModal = modalScope.closeModal;
			}

			modalScope.modal.show();

		}, function (err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	function _cleanup(scope) {
		scope.$destroy();
		if (scope.modal) {
			scope.modal.remove();
		}
	}

	function _evalController(ctrlName) {
		var result = {
			isControllerAs: false,
			controllerName: '',
			propName: ''
		};
		var fragments = (ctrlName || '').trim().split(/\s+/);
		result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
		if (result.isControllerAs) {
			result.controllerName = fragments[0];
			result.propName = fragments[2];
		} else {
			result.controllerName = ctrlName;
		}

		return result;
	}
}])

.service('I4MISettingsService', ['$localStorage','$crypto',function($localStorage,$crypto){
	var encryptionKey;
	if ( window.device && device.uuid ) {
		encryptionKey = device.uuid;
	} else {
		encryptionKey = '1234';
	}
	
	if ( !$localStorage.settings ) {
		$localStorage.settings = {};
	}
	
	return {
		set: function(key, value) {
			$localStorage.settings[key] = $crypto.encrypt(JSON.stringify(value), encryptionKey);
		},
		get: function(key) {
			if ( $localStorage.settings[key] ) {
				return JSON.parse($crypto.decrypt($localStorage.settings[key], encryptionKey));
			}
			return {};
		}
	}
}])

.service('I4MICcdaService',['$q','$http',function($q,$http){
	var self = this;
	
	var importRecord = function(url){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: url
		}).then(function successCallback(response){
			var record = BlueButton(response.data);
			deferred.resolve(record);
		},function errorCallback(response){
			deferred.reject('Could not connect!');
		});
		return deferred.promise;
	}
	
	return {
		importRecord: importRecord
	}
}])

.service('I4MINativeService',['$q',function($q){
	var self = this;
	
	var call = function(action, args){
		var deferred = $q.defer();
		cordova.exec(deferred.resolve, deferred.reject, "I4MI", action, args);
		return deferred.promise;
	};
	
	cordova.exec(function(result){
		var fields = result.fields;
		for (var j = 0; j < fields.length; j++ ) {
			self[fields[j]] = function(){
				return call(fields[j], arguments);
			};
		}
	}, function(){}, "I4MI", "i4miNativeMethods", args);
	
	return {
		exec: call
	}
}])

.service('I4MIHealthKitService',['I4MIModalService','$q', '$ionicPlatform',function(I4MIModalService, $q, $ionicPlatform){
	var self = this;
	var available = false;
	$ionicPlatform.ready(function(){
		var hk = {
			available: function(){
				return $q(function(resolve, reject){
					resolve(false);
				});
			}
		}
		if ( window.plugins && plugins.healthkit ) {
			hk = plugins.healthkit;
			available = true;
		}
		for ( var m in hk ) {
			self[m] = function(options) {
				var deferred = $q.defer();
				hk[m].call(self, options, deferred.resolve, deferred.reject);
				return deferred.promise;
			}
		}
		
		window.healthkit = self;
	});
	
	return {
		exportToMIDATA: function(map) {
			
		},
		syncToMIDATA: function(types, map) {
			this.monitorSampleType();
		},
		doWhenAvailable: function(func) {
			if ( available ) {
				func();
			}
		},
		import: function(types, options) {
			options.startDate = options.startDate || new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
			options.endDate = options.endDate || new Date();
			
			//self.querySampleType({'sampleType': 'HKQuantityTypeIdentifierStepCount'
		}
	}
}])

.service('I4MIDefaultsService',['I4MISettingsService', 'I4MIMapping', 'I4MIUnits', 'I4MISystems', 'I4MIFormats', 'I4MISchemes', function(I4MISettingsService, I4MIMapping, I4MIUnits, I4MISystems, I4MIFormats, I4MISchemes){
	var defaults = I4MISettingsService.get('i4mi.defaults');
	defaults.I4MIMapping = defaults.I4MIMapping || I4MIMapping;
	defaults.I4MIUnits = defaults.I4MIUnits || I4MIUnits;
	defaults.I4MISystems = defaults.I4MISystems || I4MISystems;
	defaults.I4MIFormats = defaults.I4MIFormats || I4MIFormats;
	defaults.I4MISchemes = defaults.I4MISchemes || I4MISchemes;

	var get = function(path, obj) {
		path = path.split(".");
		var value = obj || defaults;
		for ( var i in path ) {
			value = value[path[i]];
			if ( typeof value === "string" ) {
				if ( value.substr(0, 5) === "$ref:" ) {
					value = get(value.substr(5));
				} else {
					var m = value.match(/\{\$ref:[^\{\}\|]+\}/gi);
					for ( var i in m ) {
						var v = get(m[i].substring(6, m[i].length-1));
						value = value.replace(m[i], v);
					}
				}
			}
		}
		return resolve(value);
	}
	var getString = function(path, obj) {
		var value = get(path, obj);
		if ( typeof value !== "string" ) {
			value = JSON.stringify(value);
		}
		return value;
	}
	var set = function(path, val, obj) {
		path = path.split(".");
		obj = obj || defaults;
		var set = [obj];
		for ( index in path ) {
			set.push( set[index][path[index]] || {} );
		}
		set[set.length - 1] = val;
		for ( index in path ) {
			set[path.length - 1 - index][path[path.length - 1 - index]] = set[path.length - index];
		}
	}
	var resolve = function(obj) {
		for ( var key in obj ) {
			var value = obj[key];
			if ( typeof value === "string" ) {
				if ( value.substr(0, 5) === "$ref:" ) {
					value = get(value.substr(5));
				} else {
					var m = value.match(/\{\$ref:[^\{\}\|]+\}/gi);
					for ( var i in m ) {
						var v = get(m[i].substring(6, m[i].length-1));
						value = value.replace(m[i], v);
					}
				}
			}
			if ( typeof value === "object" ) {
				value = resolve(value);
			}
			obj[key] = value;
		}
		return obj;
	}

	return {
		get: get,
		getString: getString,
		set: set,
		resolve: resolve
	}
}])

.service('I4MIMappingService',['I4MIDefaultsService',function(I4MIDefaultsService){
	var mapping = I4MIDefaultsService.get('I4MIMapping');
	var schemes = I4MIDefaultsService.get('I4MISchemes');

	var map = function(src, dst, data) {
		if ( !Array.isArray(data) ) {
			data = [data];
		}
		var output = [];
		for ( var i in data ) {
			var d = data[i];
			var matchFound = false;
			var type;
			for ( var j in schemes ) {
				var s = schemes[j];
				for ( var k in mapping ) {
					var m = mapping[k];
					if ( I4MIDefaultsService.getString(m[src].typeKey,d) === I4MIDefaultsService.getString(m[src].typeKey,s[src]) ) {
						type = j;
						matchFound = true;
						break;
					}
				}
				if ( matchFound ) {
					break;
				}
			}
			var out = JSON.parse(JSON.stringify(schemes[type][dst]));
			for ( var key in mapping[type][src] ) {
				if ( key === "typeKey" ) {
					continue;
				}
				var p = mapping[type][src][key][0].split("|");
				var value = I4MIDefaultsService.get(p[0],d);
				var values = mapping[type][dst][key];
				for ( var i in values ) {
					var v = values[i].split("|");
					var path = v[0];
					if ( key === "date" ) {
						var format = v[1];
						var date = new Date(value);
						if ( format === "iso" ) {
							date = date.toISOString();
						}
						value = date;
					}
					I4MIDefaultsService.set(path,value,out);
				}
			}
			output.push(out);
		}
		return output;
	}

	return {
		map: map
	}
}])

.service('I4MIMidataService', ['I4MIModalService','I4MISettingsService','$q','$http','$crypto','APPNAME','APPSECRET',function(I4MIModalService,I4MISettingsService,$q,$http,$crypto,APPNAME,APPSECRET){
	var appname = APPNAME;
	var appsecr = APPSECRET;
	
	var setMidata = function(value) {
		var midataSetting = {
			encrypted: $crypto.encrypt(JSON.stringify(value),appsecr)
		}
		I4MISettingsService.set('midata', midataSetting);
	}
	var getMidata = function() {
		var midataSetting = I4MISettingsService.get('midata');
		if ( midataSetting.encrypted ) {
			try {
				return JSON.parse($crypto.decrypt(midataSetting.encrypted, appsecr));
			} catch (error) {
				return {};
			}
		}
		return {};
		
	}
	
	var midata = getMidata();
	
	var logout = function() {
		midata = {};
		setMidata({});
	}
	
	var auth = function(user) {
		var data = {
			appname: appname,
			secret: appsecr
		}
		if ( user.refreshToken ) {
			data.refreshToken = user.refreshToken;
		} else {
			data.username = user.username;
			data.password = user.password;
		}
		user.server = 'https://' + user.server.replace(/^https*:\/\//, '');
		return $q(function(resolve, reject){
			$http({
				method: 'POST', url: user.server + '/v1/auth',
				data: data
			}).then(function successCallback(response) {
				if (typeof response.status === 'undefined' || response.status != 200) {
					logout();
					resolve({
						authorized: false,
						info: 'Login failed.'
					});
				} else {
					var credentials = response.data;
					credentials.info = 'Login successfull.';
					credentials.authorized = true;
					midata = {};
					midata.credentials = credentials;
					midata.server = user.server;
					midata.username = user.username;
					setMidata(midata);
					resolve(credentials);
				}
			}, function errorCallback(response) {
				logout();
				if (typeof response.data === 'undefined') {
					reject('Could not connect!');
				} else {
					reject(response.data);
				}
			});
		});
	}
	
	if ( midata.credentials && midata.credentials.refreshToken !== '' ) {
		auth({
			refreshToken: midata.credentials.refreshToken,
			username: midata.username,
			server: midata.server
		}).then(function(credentials){
			
		},function(reason){
			
		});
	}
	
	var push = function(action, entries, index) {
		return $q(function(resolve, reject){
			if ( entries.length === 0 ) {
				return resolve({
					info: 'At least one must not be empty!',
					success: false
				});
			}
			
			var data = entries[index];
			if ( typeof data.data === 'object' ) {
				data.data = JSON.stringify(data.data);
			}
			if ( !midata.credentials || !midata.credentials.authToken ) {
				return reject('You must login first in order to add a new entry!');
			}
			data.authToken = midata.credentials.authToken;
			$http({
				method: 'POST', url: midata.server + '/v1/records/' + action,
				data: data
			}).then(function successCallback(response) {
				if (typeof response.status === 'undefined' || response.status != 200) {
					reject('Could not push data to server!');
				} else {
					if (index < entries.length - 1) {
						push(action, entries, index + 1).then(function(yes){
							resolve(yes);
						},function(no){
							reject(no);
						});
					} else {
						resolve({
							info: 'Entrey saved.',
							success: true
						});
					}
				}
			}, function errorCallback(response) {
				reject('Could not push data to server!');
			});
		});
	};
	
	return {
		auth: auth,
		login: function(username, password, server) {
			if ( midata.credentials && midata.credentials.authToken !== '' ) {
				return $q(function(resolve, reject){
					resolve(midata.credentials);
				});
			}
			server = server || midata.server;
			if ( username && password && server ) {
				return auth({username: username, password: password, server: server});
			}
			return I4MIModalService.show('i4mi.midata.login.html',
										'I4MIMidataLoginController',
										{
											viewClass: 'modal',
											user: {username: username, password: password, server: server}
										},
										{
											animation: '',
											focusFirstInput: true,
											backdropClickToClose: false,
											hardwareBackButtonClose: false
										});
		},
		logout: logout,
		loggedIn: function() {
			return midata.credentials && midata.credentials.authToken !== '';
		},
		currentUser: function() {
			return midata.username;
		},
		all: function() {
			return [];
		},
		search: function(fields,properties) {
			fields = fields || ['data','name'];
			fields.push('_id','version');
			properties = properties || {};
			
			return $q(function(resolve, reject){
				$http({
					method: 'POST', url: midata.server + '/v1/records/search',
					data: {
						authToken: midata.credentials.authToken,
						fields: fields,
						properties: properties
					}
				}).then(function successCallback(response){
					if (typeof response.status === 'undefined' || response.status != 200) {
						reject('Connection error!');
					} else {
						for ( index in response.data ) {
							var item = response.data[index];
							try {
								if ( typeof item.data.valueQuantity.value === 'string' ) {
									var json = JSON.parse(item.data.valueQuantity.value);
									item.data.valueQuantity.value = json;
								}
							} catch (error) {}
						}
						resolve(response);
					}
				},function errorCallback(response){
					reject('Could not connect!');
				});
			});
		},
		add: function(entry) {
			if ( !Array.isArray(entry) ) {
				entry = [entry];
			}
			return push('create', entry, 0);
		},
		update: function(entry) {
			if ( !Array.isArray(entry) ) {
				entry = [entry];
			}
			for ( index in entry ) {
				var update = {
					_id: entry[index]._id,
					version: entry[index].version,
					data: entry[index].data
				};
				entry[index] = update;
			}
			return push('update', entry, 0);
		},
		remove: function(entry) {
			
		},
		newEntry: function(model,schema,fhir,options){
			options = options || {};
			return I4MIModalService.show('i4mi.midata.entry.html',
									'I4MIMidataEntryController',
									{
										viewClass: 'modal',
										model: model,
										schema: schema,
										fhir: fhir,
										groupEntry: options.groupEntry,
										clear: options.clear,
										native: options.native
									},
									{
										animation: 'slide-in-up',
										focusFirstInput: true,
										backdropClickToClose: true,
										hardwareBackButtonClose: true
									});
		}
	}
}])

;