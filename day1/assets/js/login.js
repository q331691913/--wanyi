$(function() {

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次输入的密码不一致！'
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $("#form_reg [name=password]").val() },
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录哦！', { icon: 6 });
                $("#link_login").click()
            })

    })

    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem = ('token', res.token)
                location.href = './index.html'
            }
        })
    })

})