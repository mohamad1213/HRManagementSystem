from django.db import models
from apps.core.models import Employee

class PayrollRecord(models.Model):
    STATUS_CHOICES = [
        ('Paid', 'Paid'),
        ('Processing', 'Processing'),
        ('Pending', 'Pending'),
        ('On Hold', 'On Hold'),
        ('Failed', 'Failed'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payrolls')
    period_month = models.IntegerField()
    period_year = models.IntegerField()
    gross_salary = models.DecimalField(max_digits=12, decimal_places=2)
    net_pay = models.DecimalField(max_digits=12, decimal_places=2)
    allowance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    incentive = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    deductions = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    payment_date = models.DateField(null=True, blank=True)
    bank_name = models.CharField(max_length=100, blank=True)
    account_number = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ('employee', 'period_month', 'period_year')

    def __str__(self):
        return f"{self.employee} - {self.period_month}/{self.period_year}"

class PayrollElement(models.Model):
    CATEGORY_CHOICES = [
        ('Net Salary', 'Net Salary'),
        ('Allowance', 'Allowance'),
        ('Incentive', 'Incentive'),
        ('Beneficial', 'Beneficial'),
        ('Contribution', 'Contribution'),
        ('Deduction', 'Deduction'),
    ]

    payroll = models.ForeignKey(PayrollRecord, on_delete=models.CASCADE, related_name='elements')
    element_name = models.CharField(max_length=100) # e.g. "Housing Allowance"
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    reimbursement = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.element_name}: {self.amount}"
