from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives




def send_pass(username,pwd,email):
    context ={
        'username': username,
        'pwd': pwd,
    }

    html_content = render_to_string("pass_mail.html", context)
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(
        f'glasstechSales',
        text_content,
        settings.EMAIL_HOST_USER ,
        [email]
    )
    email.attach_alternative(html_content, 'text/html')
    email.send()
    return True