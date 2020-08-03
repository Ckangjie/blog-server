;
$(function() {
	var signUpButton = document.getElementById('signUp')
	var signInButton = document.getElementById('signIn')
	var container = document.getElementById('dowebok')

	signUpButton.addEventListener('click', function() {
		container.classList.add('right-panel-active')
	})

	signInButton.addEventListener('click', function() {
		container.classList.remove('right-panel-active')
	})

	$('.register').click(function() {
		$('title').html('注册')
	})

	$('.login').click(function() {
		$('title').html('登录')
	})

	// 验证表单数据格式
	$.extend($.validator, {
		messages: {
			email: '邮箱格式不正确',
			rangelength: $.validator.format("密码为6-18位字符")
		}
	});
	// register表单
	$('.register-data').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			name: {
				required: true,
			},
			pwd: {
				required: true,
				rangelength: [6, 18]
			}
		},
		messages: {
			email: {
				required: '邮箱不能为空！'
			},
			name: {
				required: '用户名不能为空！'
			},
			pwd: {
				required: '密码不能为空'
			}
		}
	});
	//注册 
	$('.register-btn').click(function(e) {
		// 取消默认事件
		e.preventDefault();
		if ($('.register-data').valid()) {
			// 获取各值
			let userName = $('[name=name]').val()
			let email = $('[name=email]').val()
			let pwd = $('[name=pwd]').val()

			// 用户名，密码，邮箱正则。
			// let nameReg = /^[a-z0-9_-]{3,16}$/
			// let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			if (pwd && reg.test(pwd)) {
				// 密码加密
				pwd = hex_md5(pwd)
				
				$.ajax({
					url:api+'register',
					type:'post',
					dataType:'json',
					data:{
						userName,
						email,
						pwd
					},
					success:function(res){
						if(res.status==200){
							$.toolTips({
								type:'success',
								content:'注册成功',
								time:1000,
								success:function(){
									$('.dowebok').removeClass('right-panel-active')
								}
							})
						}
					}
				})
			} else {
				$.toolTips({
					type: 'error',
					content: '密码错误',
					time: 3000
				})
			}
		}
	})

	//登录
	 // 验证表单数据格式
	 $.extend($.validator, {
	 	messages: {
	 		email: '邮箱格式不正确',
	 		rangelength: $.validator.format("密码为6-18位字符")
	 	}
	 });
	 // register表单
	 $('.login-data').validate({
	 	rules: {
	 		lemail: {
	 			required: true,
	 			email: true
	 		},
	 		
	 		lpwd: {
	 			required: true,
	 			rangelength: [6, 18]
	 		}
	 	},
	 	messages: {
	 		lemail: {
	 			required: '邮箱不能为空！'
	 		},
	 		
	 		lpwd: {
	 			required: '密码不能为空'
	 		}
	 	}
	 });
	 
	 // 判断登录
	 let token = window.localStorage.getItem('token')
	 if (token) {
	 	window.location.href = "usercenter.html"
	 	return false;
	 }
	//点击登录 
	$('.login-btn').click(function(e){
		// console.log(222)
		// 取消默认事件
		e.preventDefault();
		if($('.login-data').valid()){
			let email = $('[name=lemail]').val()
			let pwd = $('[name=lpwd]').val()
			if(pwd&&reg.test(pwd)){
				// md5加密
				pwd = hex_md5(pwd)
				
				$.ajax({
					url:api+'login',
					type:'post',
					dataType:'json',
					data:{
						email,
						pwd
					},
					success:function(res){
						if(res.status==200){
							// 存储token和用户信息
							window.localStorage.setItem('token',res.data.token)
							window.localStorage.setItem('info',JSON.stringify(res.data.info))
							
							$.toolTips({
								type: 'success',
								content: 'ok,5s自动跳转',
								time: 3000,
								success: function () {
									window.location.href = "usercenter.html"
								}
							})
						}else{
							$.toolTips({
								type:'error',
								content:'密码错误',
								time:0,
								success:function(){
									alert('密码错误')
								}
							})
						}
					}
				})
				
			}
		}
	})
})
