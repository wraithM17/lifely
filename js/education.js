const educationButtons = {

	engineeringBtn:`<button class="btn btn-info" onclick="college('engineering')">Engineering College</button>`,
	liberalArtsBtn:`<button class="btn btn-info" onclick="college('liberalArts')">Liberal Arts College</button>`,
	commerceBtn:`<button class="btn btn-info" onclick="college('commerce')">Commerce College</button>`,
	lawBtn:`<button class="btn btn-success" onclick="college('law')">Law College</button>`,
	medicalBtn:`<button class="btn btn-success" onclick="college('medical')">Medical College</button>`,
	communityBtn:`<button class="btn btn-success" onclick="college('community')">Community College</button>`,

}

const courses = {

	engineering:{
		title:'Engineering College',
		req:75,
		scholarship:85,
		fees:[35000,37000,38000,40000],
	
	},

	medical:{
		title:'Medical School',
		req:80,
		scholarship:90,
		fees:[40000,42000,44000,45000],
	
	},

	commerce:{
		title:'Commerce College',
		req:70,
		scholarship:85,
		fees:[28000,30000,32000,35000],
	
	},

	law:{
		title:'Law School',
		req:70,
		scholarship:85,
		fees:[30000,32000,35000,40000],
	
	},

	liberalArts:{
		title:'Liberal Arts College',
		req:60,
		scholarship:80,
		fees:[20000,22000,24000,25000],
	
	},

	community:{
		title:'Community College',
		req:55,
		scholarship:80,
		fees:[12000,15000,18000,20000],
	}


}






function study(){
	let html = `<br><br>
		${educationButtons.engineeringBtn}<br><br>	
		${educationButtons.medicalBtn}<br><br>
		${educationButtons.commerceBtn}<br><br>
		${educationButtons.lawBtn}<br><br>
		${educationButtons.liberalArtsBtn}<br><br>
		${educationButtons.communityBtn}
		<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"College Options",
		showConfirmButton:false,
		html:html,
		showCloseButton:true

	});
};




function college(course){

	let title = courses[course]['title'];
	let reqIntellect = courses[course]['req'];
	let scholarshipIntellect = courses[course]['scholarship'];
	let fees = randchoice(courses[course]['fees']);


	let html = `<br>

		Intelligence Required : ${reqIntellect}%<br>
		Total Fees (4 years) : $${fees}<br><br> 

		Obtain the college degree for working in related fields.
		<br>
		You are eligible for a scholarship if you have intellect of more 
		than ${scholarshipIntellect}%.<br><br><br>
		<button onclick=studentLoan('${course}',${fees}) class="btn-sm btn-green">Student Loan</button>
		&nbsp;&nbsp;
		<button onclick=scholarship('${course}') class="btn-sm btn-green">Scholarship</button>

		<br><br>`;


	Swal.fire({
		heightAuto:false,
		icon:'info',
		title:title,
		html:html,
		showConfirmButton:false,
		showCloseButton:true,
	}).then(() => {

	});


}


function scholarship(course){
	let courseObj = courses[course];

	if (intellect > courseObj.scholarship){
		scholarshipAccept(course);
	}
	else {
		scholarshipReject();
	}

}



function scholarshipAccept(course){

	message(`You were granted a college scholarship`);

	let html = `<br><br>
	You've been accepted for a paid scholarship for the whole college fees.
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		icon:'success',
		title:'Accepted!',
		html:html,
		confirmButtonText:'Continue',
		showCancelButton:true,
		cancelButtonText:`Don't want it`
	}).then((result) => {
		if (result.value){
			message(`You availed the college scholarship and enrolled in college`);
			
			let html = `<br><br>
			You availed the scholarship and are now enrolled in college.
			<br><br>`;


			Swal.fire({
				heightAuto:false,
				title:'College Started!',
				icon:'success',
				confirmButtonText:'Great',
				html:html
			})
			startCollege(course);
		}

	});

}



function scholarshipReject(){

	let html = `<br><br>
	You do not have the required criteria for a scholarship in this field.
	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'Denied!',
		html:html,
		icon:'error',
		confirmButtonText:'Okay'
	});
}




function studentLoan(course,fees){

	let courseObj = courses[course];


	if (intellect >= courseObj.req){
		studentLoanConfirm(course,fees);
	}
	else {
		studentLoanReject();
	};

}


function studentLoanConfirm(course,fees){
	
	message(`You're eligible for a student loan of $${fees}`);
	let html = `<br>

	You are eligible for this college course as you fulfil all the criteria.<br>
	You may now enroll for the course with a student loan of <b>$${fees}</b> 
	provided to you by the <b>${USER.country} National Bank</b>.<br>
	<br><br>
	<button onclick=studentLoanAccept('${course}',${fees}) class='btn-sm btn-radius btn-blue'>Continue</button>
	
	<br><br>`;

	swal.fire({
		heightAuto:false,
		title:'Confirm Enrollment',
		html:html,
		icon:'info',
		showConfirmButton:false,
		showCloseButton:true,
		background:swalBackground
	});

}






function studentLoanAccept(course,fees){

	
	student.loanMonths = 0;
	student.loanAmount = approx(fees/48);
	hasStudentLoan = true;
	hasLoan = true;
	message(`Your student loan of <b>$${fees}</b> was accepted and alloted`);
	message(`An amount of $${student.loanAmount} will be added to your bank debt every month`);
	

	let html = `<br>
	Net Student Debt : $${fees}<br>
	Monthly Student Debt : $${student.loanAmount}<br>

	<br><br>`;


	Swal.fire({
		heightAuto:false,
		title:'Student Loan Alloted!',
		icon:'success',
		background:swalBackground,
		html:html,
		confirmButtonText:'Continue',
		allowOutsideClick:false
	}).then((result) => {
		if (result.value){
			startCollege(course);
		}
	});

}






function studentLoanReject(){
	
	let html = `<br>
	Your college application was denied as you didn't fulfil all the requirements
	for enrollment.<br>Please make sure you fulfil all the criteria before applying again.

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'College Denied!',
		icon:'error',
		html:html,
		confirmButtonText:'Okay',
		background:swalBackground
	})
}







function startCollege(course){

	isStudent = true;
	student.course = course;
	student.months = 0;
	student.collegeDuration = 48;
	USER.job.name = `${capitalize(student.course)} Student`;

	message(`You're now enrolled in a college`);

	HTML.actions.setAttribute('onclick','studentMenu()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-green');


}









function studentMenu(){
	

	let html = `<br><br>
	<br><br>
	${buttons.myCollege}
	<br><br><br>
	${buttons.bank}<br><br><br>
	${buttons.profile}&nbsp;&nbsp;${buttons.assets}

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:"Actions",
		html:html,
		showConfirmButton:false

	});

};




function myCollege(){

	let monthsRemain = student.collegeDuration - student.months;

	let html = `<br>
	Months in College : ${student.months}<br>
	Months remaining : ${monthsRemain}<br>
	<br><br>
	${buttons.leaveCollege}

	<br><br>`;

	Swal.fire({
		heightAuto:false,
		title:'My College',
		html:html,
		showConfirmButton:false,
		showCloseButton:true
	})

}



function leaveCollege(){


	Swal.fire({
		heightAuto:false,
		icon:"warning",
		title:"Do you really want to leave college?",
		confirmButtonText:"Yes",
		showCancelButton:true,
		cancelButtonText:"No"
	}).then((result) => {
		if (result.value){

			let html = `<br>
			Months studied : <b>${student.months}</b> months<br>
			Degree : <b>${student.course}</b><br>
			<br><br>`;

			Swal.fire({
				heightAuto:false,
				icon:"info",
				title:"Dropped out of college",
				html:html
			});	

			isStudent = false;
			student.months = 0;
			student.course = null;
			student.collegeDuration = 0;
			

			USER.job.name = "Unemployed";
			message(`You dropped out of college`);

			HTML.actions.setAttribute('onclick','actions()');
			HTML.actions.classList = [];
			HTML.actions.classList.add('btn-main','btn-dark');

		}

	});

	
};





function graduateCollege(){
	deg = USER.job.name;
	let course;

	if (deg.includes("Engineer")){
		course = "ENG";
	}
	else if (deg.includes("Liberal")){
		course = "LIB";
	}
	else if (deg.includes("Commerce")){
		course = "COM";
	}
	else if (deg.includes("Arts")){
		course = "ART";
	}
	else if (deg.includes("Law")){
		course = "LAW";
	}
	else if (deg.includes("Medical")){
		course = "MED";
	}
	else if (deg.includes("Community")){
		course = "COMMUNITY";
	}
	else {
		document.write("Error in student_pass()");
	}
	

	message(`You passed out as a ${deg}`);
	USER.job.name = "Unemployed";
	isStudent = false;
	student.months = 0;
	student.hasLoan = false;

	USER.education.degrees[course] = {
		'cgpa':null,
		'grade':null,
		'remark':"Passed successfully"
	}
	
	HTML.actions.setAttribute('onclick','actions()');
	HTML.actions.classList = [];
	HTML.actions.classList.add('btn-main','btn-dark');
};




function studentTestResult(result){

	if (result == "pass"){
		message(`You passed the college test`);
		Swal.fire({
			heightAuto:false,
			title:"You passed the test!",
			icon:"success",
			confirmButtonText:"Sweet!"
		});
		intellect += randint(1,2);

	}
	else {
		message(`You failed the college test`);
		Swal.fire({
			heightAuto:false,
			title:"You failed the test!",
			icon:"error",
			confirmButtonText:"Rats!"
		});

		intellect -= randint(1,3);
	}
	display();
};








function studentTest(start=false){
	if (start==true){
		let rand = randint(0,1);

		let p1 = randint(1,12);
		let p2 = randint(1,12);
		let p3 = randint(1,20);

		if (rand == 0){
			var ans = p1*p2+p3;
			var sign = "+";
		}
		else {
			var ans = p1*p2-p3;
			var sign = "-";
		}
		let question = `${p1} <b>x</b> ${p2} <b>${sign}</b> ${p3}`;
		let html = `
		<br>
		Answer the following question : <br><br>
		<h3>${question}</h3>
		<br><br>
		`;
		Swal.fire({
			heightAuto:false,
			icon:"question",
			title:"Test In Process",
			html:html,
			confirmButtonText:"Submit",
			allowOutsideClick:false,
			input:"text",
			timer:6000,
			timerProgressBar:true,

			inputValidator: (answer) => {
				if (answer == ans){
					studentTestResult('pass');
				}
				else {
					studentTestResult('fail');
				}
			}
		}).then((result) => {
			if (result.dismiss == Swal.DismissReason.timer){
				studentTestResult("fail");
			};
		});
	}
	else {
		let html=`<br><br>
		
		You will have <b>6</b> seconds to answer the question.<br>
		You will need to answer the question correctly to pass the test.
		
		<br><br>`;

		Swal.fire({
			heightAuto:false,
			icon:"info",
			title:"College Test",
			html:html,
			confirmButtonText:"Take the Test",
			showCancelButton:true,
			cancelButtonText:"Don't care",
			allowOutsideClick:false

		}).then((result)=> {
			if (result.value){
				message(`You took the college test`);
				studentTest(true);
			}
			else if (result.dismiss == Swal.DismissReason.cancel){
				message(`You ignored a college test and failed in it`);
				intellect -= randint(2,3);
				studentTestResult("fail");

			}
		});
	};
};


function studentRandomEvents(){

	let rand = randint(1,100);

	if (rand <= 6){
		studentTest();
	}


}