;
$(function() {
	let token = window.localStorage.getItem('token')
	if (!token) {
		window.location.href = "login-register.html"
		return false;
	} else {
		let info = window.localStorage.getItem('info')
		info = JSON.parse(info)
		$('.userName').html(info.email)
	}
	// 验证登录
	$.ajax({
		url: api + 'verifylogin',
		type: 'post',
		data: {
			token
		},
		dataType: 'json',
		success: function(res) {
			if (res.status == 512) {
				window.localStorage.removeItem('token')
				window.localStorage.removeItem('info')
				window.location.href = "login-register.html"
			}
		}
	})

	// 退出登录
	$('.loginout').click(function() {
		let info = window.localStorage.getItem('info')
		info = JSON.parse(info)
		$.ajax({
			url: api + 'loginout',
			type: 'post',
			dataType: 'json',
			data: {
				pwd: info.pwd
			},
			success: function(res) {
				if (res.status == 200) {
					window.localStorage.removeItem('token')
					window.localStorage.removeItem('info')
					window.location.href = "login-register.html"
				} else {
					$.toolTips({
						type: 'err',
						content: ''
					})
				}
			}
		})
	})

	// 用户列表渲染
	$.ajax({
		url: api + 'getList',
		type: 'get',
		dataType: 'json',
		success: function(res) {
			if (res.status == 200) {
				let html = ''
				for (let item of res.data) {
					html +=
						`<tr>
							<td>${item.id}</td>
							<td>${item.userName}</td>
							<td>${item.pwd}</td>
							<td>${item.email}</td>
							<td>
								<a href="javascipt:;" class="ubtn" data-toggle="modal" data-target="#modal">修改</a>
								<a href="javascipt:;" class="dbtn">删除</a>
							</td>
						</tr>`
				}
				$('#content').html(html)


				// 删除用户
				$('.dbtn').click(function() {
					// 获取当前点击按钮所在行的下标
					let _this = $(this)
					let index = $(this).closest('tr').index()
					console.log(index)
					let id = $('td:first-child').eq(index).html()

					$.ajax({
						url: api + 'delete',
						type: 'get',
						dataType: 'json',
						data: {
							id: id
						},
						success: function(res) {
							if (res.status == 200) {
								_this.closest('tr').remove()
							}
						}
					})
				});
			}
		}
	});

	// 获取ajax动态添加的属性
	// 弹出修改信息框
	$(document).on('click', '.ubtn', function() {

		let _this = $(this)
		let index = $(this).closest('tr').index()

		let id = $('td:first-child').eq(index).html()
		console.log(id)
		$.ajax({
			url: api + 'update',
			type: 'get',
			dataType: 'json',
			data: {
				id: id
			},
			success: function(res) {
				if (res.status == 200) {

					for (let item of res.data) {
						$('[name=id]').val(item.id)
						$('[name=name]').val(item.userName)
						$('[name=pwd]').val(item.pwd)
						$('[name=email]').val(item.email)
					}
				}
			}
		})
	});

	// 提交修改信息
	$('.upBtn').click(function() {
		let id = $('[name=id]').val()
		let name = $('[name=name]').val()
		let pwd = $('[name=pwd]').val()
		let email = $('[name=email]').val()

		if (pwd && reg.test(pwd)) {
			pwd = hex_md5(pwd)
			$.ajax({
				url: api + 'updateinfo',
				type: 'post',
				dataType: 'json',
				data: {
					id,
					name,
					pwd,
					email
				},
				success: function(res) {
					if (res.status == 200) {
						location.reload();
					}
				}
			})
		} else {
			alert('密码格式不正确')
		}
	});

	// 添加用户
	$('.addBtn').click(function() {
		let userName = $('[name=adname]').val()
		let pwd = $('[name=adpwd]').val()
		let email = $('[name=ademail]').val()

		if (reg.test(pwd)) {
			pwd = hex_md5(pwd)
			console.log(name)

			$.ajax({
				url: api + 'addUser',
				type: 'post',
				dataType: 'json',
				data: {
					userName,
					pwd,
					email
				},
				success: function(res) {
					if (res.status == 200) {
						let value = $("[name=value]").val() || ''
						getData(value)
					}
				}
			})

		} else {
			alert('密码格式不正确')
		}
	});

	// 模糊查询
	// 聚焦事件
	$('.search-box input').focus(function() {
		//获取input 元素,并实时监听用户输入
		//逻辑
		$(this).attr('placeholder','')
	});
	
	$('.search-box input').blur(function(){
		$(this).attr('placeholder','搜索关键字')
	});
	// keyup 实时搜索
	$('.search-box input').keyup(function(){
		let value = $('[name=value]').val()
		getData(value)
	})
	
	// // 点击搜索
	// $('.search-btn').click(function(){
	// 	let value = $('[name=value]').val()
	// 	getData(value)
	// })
	
})
// 回车搜索
$('.search-box input').keydown(function(event){
	if(event.keyCode == 13) {
		let value = this.value
		getData(value)
		// 阻止默认事件
		return false;
	}
})

function getData(value){
	$.ajax({
		url:api+'search',
		type:'get',
		dataType:'json',
		data:{
			value: value
		},
		success:function(res){
			if(res.status==200){
				let html=''
				for (let item of res.data) {
					html +=
						`<tr>
							<td>${item.id}</td>
							<td>${item.userName}</td>
							<td>${item.pwd}</td>
							<td>${item.email}</td>
							<td>
								<a href="javascipt:;" class="ubtn" data-toggle="modal" data-target="#modal">修改</a>
								<a href="javascipt:;" class="dbtn">删除</a>
							</td>
						</tr>`
				}
				$('#content').html(html)
			}
		}
	});
}
