from rest_framework import serializers
from api_app.models import Patient, HealthCareDetails

""" class PatientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Patient
        fields = ['first_name', 'last_name', 'blood']
 """
class PatientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Patient
        fields = ['patient_id','last_name','first_name','blood'] 

class HealthCareDetailsSerializer(serializers.HyperlinkedModelSerializer):
    fk = PatientSerializer()

    class Meta:
        model = HealthCareDetails
        fields = ['healthcare_id', 'healthcarenumber', 'physician', 'fk']

    def create(self, validated_data):
        fk_data = validated_data.pop('fk', None)
        patient_serializer = PatientSerializer(data=fk_data)
        patient_serializer.is_valid(raise_exception=True)
        patient = patient_serializer.save()

        healthcare_details = HealthCareDetails.objects.create(fk=patient, **validated_data)
        return healthcare_details