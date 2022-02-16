from django.db import migrations
from apiAPP.user.models import CustomUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="nym",
                            email= "nym673@gmail.com",
                            is_staff=True,
                            is_superuser=True,
                            phone="9369841533",
                            gender="Male"
                            )
        user.set_password("z00nym@FIR=MCA")
        user.save()

    dependencies = [

    ]

    operations =[
        migrations.RunPython(seed_data),        
    ]